import { useFocusEffect } from '@react-navigation/native';
import { AsyncThunkAction } from '@reduxjs/toolkit';
import React, { ReactElement, useCallback, useState } from 'react';
import { FlatList } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { ScreenContainer } from 'react-native-screens';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { UsersSearchParameters } from '../../redux/users/thunks';
import styles from './ListScreen.styles';

const LIMIT = 10;

export interface ListWithSearchProps<T> {
    renderCard: (
        item: T,
        index: number,
        expandedCardIndex: number,
        setExpandedCardIndex: React.Dispatch<React.SetStateAction<number>>,
    ) => ReactElement;
    cardKeyExtractor: (item: T) => string;
    dataSelector: (state: RootState) => T[];
    loadingSelector: (state: RootState) => boolean;
    loadDataThunk: (
        parameters: UsersSearchParameters,
    ) => AsyncThunkAction<T[], UsersSearchParameters, {}>;
    loadMoreDataThunk: (
        parameters: UsersSearchParameters,
    ) => AsyncThunkAction<T[], UsersSearchParameters, {}>;
    children?: Element;
}

export const ListScreen = <T,>({
    renderCard,
    cardKeyExtractor,
    dataSelector,
    loadingSelector,
    loadDataThunk,
    loadMoreDataThunk,
    children,
}: ListWithSearchProps<T>) => {
    const dispatch = useAppDispatch();
    const data = useAppSelector(dataSelector);
    const loadingData = useAppSelector(loadingSelector);
    const [query, setQuery] = useState('');
    const [expandedCardIndex, setExpandedCardIndex] = useState(-1);
    const loadData = useCallback(
        (offset: number = 0) => {
            dispatch(
                loadDataThunk({ offset: offset, limit: LIMIT, query: query }),
            );
        },
        [dispatch, query, loadDataThunk],
    );

    useFocusEffect(
        useCallback(() => {
            loadData();
        }, [loadData]),
    );

    return (
        <ScreenContainer style={styles.container}>
            <Searchbar
                placeholder="Поиск"
                onChangeText={setQuery}
                value={query}
            />
            <FlatList
                data={data}
                refreshing={loadingData}
                onRefresh={loadData}
                onEndReachedThreshold={0.01}
                onEndReached={({ distanceFromEnd }) => {
                    if (distanceFromEnd < -1) {
                        return;
                    }
                    console.log(distanceFromEnd);
                    dispatch(
                        loadMoreDataThunk({
                            offset: data.length,
                            limit: LIMIT,
                            query: query,
                        }),
                    );
                }}
                renderItem={({ item: itemT, index }) =>
                    renderCard(
                        itemT,
                        index,
                        expandedCardIndex,
                        setExpandedCardIndex,
                    )
                }
                keyExtractor={cardKeyExtractor}
            />
            {children}
        </ScreenContainer>
    );
};
