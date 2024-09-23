import React from 'react';

interface AppContextInterface {
  locale?: any;
  t: any;
}

export const LocalizationContext = React.createContext<AppContextInterface | null>(null);