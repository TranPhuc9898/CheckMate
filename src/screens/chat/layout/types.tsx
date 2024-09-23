import { IObjectText } from "libs/helper";

//Type Screen Chat
export interface IChat {
  messages?: Array<{
    _id: string;
    createdAt: any;
    from: string;
    message: string;
    userId: string;
    image: string;
    location: {
      longitude: number;
      latitude: number;
    };
  }>;
  task?: {
    _id: string;
    address: string;
    date: any;
    duration: any;
  };
  askerInfo: {
    avatar: string;
    gender: string;
    language: string;
    name: string;
    _id: string;
  };
  taskerInfo: {
    avatar: string;
    gender: string;
    language: string;
    name: string;
    _id: string;
  };
  _id?: string;
}

export interface IChatError {
  code?: string;
  errorText?: {
    en?: string;
    id?: string;
    ko?: string;
    th?: string;
    vi?: string;
  };
  message?: string;
}

export interface ITask {
  _id?: string;
  taskPlace?: {
    city?: string;
    country?: string;
    district?: string;
  };
  taskNote?: string;
  status?: string;
  startWorking?: {
    isStart?: string;
  };
  serviceText?: {
    en?: string;
    ko?: string;
    th?: string;
    vi?: string;
  };
  serviceName?: string;
  requirement?: Array<{
    cost?: number;
    type?: number;
  }>;
  phone?: string;
  pet?: Array<{
    name?: string;
  }>;
  payment: {
    method?: string;
  };
  lng?: number;
  lat?: number;
  isPremium?: boolean;
  homeType?: string;
  date?: string;
  costDetail?: Array<{
    baseCost?: number;
    cost?: number;
    currency?: {
      code?: string;
      sign?: string;
    };
    decreasedReasons?: Array<{
      key?: string;
      promotionBy?: string;
      value?: number;
    }>;
    depositMoney?: number;
    duration?: number;
    finalCost?: number;
    increaseReasons?: Array<{
      key?: string;
      value?: number;
    }>;
    newFinalCost?: number;
    promotionBy?: string;
    transportFee?: number;
  }>;
  contactName?: string;
  address?: string;
  acceptedTasker?: Array<{
    taskerId?: string;
  }>;
}
export interface IDataListChat {
  chatId?: string;
  askerName?: string;
  isRead?: boolean;
  date?: any;
  duration?: any;
  messages?: Array<{
    _id?: string;
    createdAt?: string;
    from?: string;
    message?: string;
    userId?: string;
  }>;
  serviceText?: IObjectText;
  taskId?: string;
  askerAvatar?:any;
}
export declare module IRespond {
  interface IRespondChat {
    isSuccess?: boolean;
    status?: string;
    data?: IChat;
    error?: IChatError;
  }
  interface IRespondTask {
    isSuccess?: boolean;
    status?: string;
    data?: ITask;
  }
  interface IRespondListChat {
    isSuccess?: boolean;
    status?: string;
    data?: Array<IDataListChat>;
    error?: IChatError;
  }
}

// Type Screen Get List Chat Notification
