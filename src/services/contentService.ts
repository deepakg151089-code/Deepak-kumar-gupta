import { 
  collection, 
  query, 
  where, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc,
  getDocFromServer, 
  onSnapshot,
  Timestamp,
  orderBy,
  limit,
  increment
} from 'firebase/firestore';
import { db, auth } from '../lib/firebase';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export interface Article {
  id?: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  authorUid: string;
  date: any;
  image: string;
  featured?: boolean;
  premium?: boolean;
  contentType: 'article' | 'video' | 'audio';
  videoUrl?: string;
  audioUrl?: string;
  shareCountTwitter?: number;
  shareCountFacebook?: number;
  viewCount?: number;
  commentCount?: number;
}

export interface NomadProduct {
  id?: string;
  title: string;
  description: string;
  price: number;
  image: string;
  affiliateUrl: string;
  rating: number;
  category?: string;
}

export interface AmbitionGoal {
  id?: string;
  userId: string;
  label: string;
  progress: number;
  target: string;
  updatedAt: any;
}

export interface Comment {
  id?: string;
  articleId: string;
  userId: string;
  userName: string;
  userPhoto?: string;
  text: string;
  timestamp: any;
}

export const contentService = {
  // Articles
  getArticles: (callback: (articles: Article[]) => void) => {
    const path = 'articles';
    const q = query(collection(db, path), orderBy('date', 'desc'));
    
    return onSnapshot(q, (snapshot) => {
      const articles = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Article));
      callback(articles);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, path);
    });
  },

  getArticle: async (id: string) => {
    const path = `articles/${id}`;
    try {
      const docSnap = await getDocFromServer(doc(db, 'articles', id));
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as Article;
      }
      return null;
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, path);
    }
  },

  createArticle: async (article: Omit<Article, 'id' | 'date' | 'authorUid'>) => {
    const path = 'articles';
    try {
      const newArticle = {
        ...article,
        authorUid: auth.currentUser?.uid,
        date: Timestamp.now(),
        featured: article.featured || false,
        premium: article.premium || false,
        contentType: article.contentType || 'article'
      };
      return await addDoc(collection(db, path), newArticle);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    }
  },

  deleteArticle: async (id: string) => {
    const path = `articles/${id}`;
    try {
      await deleteDoc(doc(db, 'articles', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  },

  trackShare: async (articleId: string, platform: 'twitter' | 'facebook') => {
    const path = `articles/${articleId}`;
    try {
      const articleRef = doc(db, 'articles', articleId);
      const docSnap = await getDocFromServer(articleRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        const field = platform === 'twitter' ? 'shareCountTwitter' : 'shareCountFacebook';
        await updateDoc(articleRef, {
          [field]: (data[field] || 0) + 1
        });
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
    }
  },

  incrementViews: async (articleId: string) => {
    const path = `articles/${articleId}`;
    try {
      const articleRef = doc(db, 'articles', articleId);
      await updateDoc(articleRef, {
        viewCount: increment(1)
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
    }
  },

  // Comments
  getComments: (articleId: string, callback: (comments: Comment[]) => void) => {
    const path = `articles/${articleId}/comments`;
    const q = query(collection(db, 'articles', articleId, 'comments'), orderBy('timestamp', 'asc'));
    
    return onSnapshot(q, (snapshot) => {
      const comments = snapshot.docs.map(doc => ({ id: doc.id, articleId, ...doc.data() } as Comment));
      callback(comments);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, path);
    });
  },

  addComment: async (articleId: string, text: string) => {
    const path = `articles/${articleId}/comments`;
    const user = auth.currentUser;
    if (!user) throw new Error('Authentication required');

    try {
      const commentRef = await addDoc(collection(db, 'articles', articleId, 'comments'), {
        userId: user.uid,
        userName: user.displayName || 'Zen Nomad',
        userPhoto: user.photoURL,
        text,
        timestamp: Timestamp.now()
      });

      // Increment comment count
      await updateDoc(doc(db, 'articles', articleId), {
        commentCount: increment(1)
      });

      return commentRef;
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    }
  },

  deleteComment: async (articleId: string, commentId: string) => {
    const path = `articles/${articleId}/comments/${commentId}`;
    try {
      await deleteDoc(doc(db, 'articles', articleId, 'comments', commentId));
      
      // Decrement comment count
      await updateDoc(doc(db, 'articles', articleId), {
        commentCount: increment(-1)
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  },

  // Products
  getProducts: (callback: (products: NomadProduct[]) => void) => {
    const path = 'products';
    return onSnapshot(collection(db, path), (snapshot) => {
      const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as NomadProduct));
      callback(products);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, path);
    });
  },

  // Ambition Goals
  getUserGoals: (userId: string, callback: (goals: AmbitionGoal[]) => void) => {
    const path = 'ambition_goals';
    const q = query(collection(db, path), where('userId', '==', userId));
    
    return onSnapshot(q, (snapshot) => {
      const goals = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as AmbitionGoal));
      callback(goals);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, path);
    });
  },

  updateGoalProgress: async (goalId: string, progress: number) => {
    const path = `ambition_goals/${goalId}`;
    try {
      await updateDoc(doc(db, 'ambition_goals', goalId), {
        progress,
        updatedAt: Timestamp.now()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
    }
  },

  // Leads
  saveLead: async (data: { name: string; whatsapp: string; source: string }) => {
    const path = 'leads';
    try {
      return await addDoc(collection(db, path), {
        ...data,
        timestamp: Timestamp.now()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    }
  },

  // Partner Inquiries
  submitInquiry: async (data: { name: string; email: string; message: string }) => {
    const path = 'partner_inquiries';
    try {
      return await addDoc(collection(db, path), {
        ...data,
        timestamp: Timestamp.now()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    }
  }
};
