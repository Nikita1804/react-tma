import type { Instance } from 'mobx-state-tree';
import { getRoot, onSnapshot, types } from 'mobx-state-tree';
import { createContext, useContext } from 'react';
import { Controllers } from './controllers';
import { PagesModel } from './pages';

export const RootModel = types.model('Root', {
  pages: PagesModel,
  controllers: Controllers,
});

export const initialState = {
  pages: {},
  controllers: {},
};

export const rootStore = RootModel.create(initialState);

onSnapshot(rootStore, snapshot => {
  // eslint-disable-next-line no-console
  console.log('Snapshot: ', snapshot);
});

export type RootInstance = Instance<typeof RootModel>;
export const getTypeRoot = (self: any) => getRoot<typeof RootModel>(self);
const RootStoreContext = createContext<null | RootInstance>(null);

export const { Provider } = RootStoreContext;

// @ts-ignore
export function useMst(): typeof rootStore {
  const store = useContext(RootStoreContext);
  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider');
  }

  return store;
}
