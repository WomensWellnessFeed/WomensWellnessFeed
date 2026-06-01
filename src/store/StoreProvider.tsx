import React, { createContext, useContext, useEffect } from 'react';
import { RootStore, rootStore } from './rootStore';
import { ActivityIndicator, View } from 'react-native';

const StoreContext = createContext<RootStore>(rootStore);

export const StoreProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [isReady, setIsReady] = React.useState(false);

    useEffect(() => {
        rootStore.hydrate().finally(() => setIsReady(true));
    }, []);

    if (!isReady) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator />
            </View>
        );
    }

    return <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>;
};

export const useStores = () => useContext(StoreContext);
