import { DrawerActions, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AsyncThunkAction } from '@reduxjs/toolkit';
import React, {
    ReactElement,
    useCallback,
    useLayoutEffect,
    useState,
} from 'react';
import { FlatList, Text, TouchableNativeFeedback, View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { ScreenContainer } from 'react-native-screens';

import BackIcon from '../../components/icons/BackIcon';
import HamburgerMenuIcon from '../../components/icons/HamburgerMenuIcon';
import SeacrhIcon from '../../components/icons/SearchIcon';
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
    navigation?: StackNavigationProp<any>;
}

export const ListScreen = <T,>({
    renderCard,
    cardKeyExtractor,
    dataSelector,
    loadingSelector,
    loadDataThunk,
    loadMoreDataThunk,
    children,
    navigation,
}: ListWithSearchProps<T>) => {
    const dispatch = useAppDispatch();
    const data = useAppSelector(dataSelector);
    const loadingData = useAppSelector(loadingSelector);
    const [query, setQuery] = useState('');
    const [searchOpened, setSearchOpened] = useState(false);
    const [expandedCardIndex, setExpandedCardIndex] = useState(-1);
    const loadData = useCallback(
        (offset: number = 0) => {
            dispatch(
                loadDataThunk({ offset: offset, limit: LIMIT, query: query }),
            );
        },
        [dispatch, query, loadDataThunk],
    );
    const searchButton = () => (
        <TouchableNativeFeedback onPress={onSearchButtonPress}>
            <View style={styles.button}>
                <SeacrhIcon style={styles.icon} />
            </View>
        </TouchableNativeFeedback>
    );

    const hamburgerButton = () => (
        <TouchableNativeFeedback
            onPress={() => navigation?.dispatch(DrawerActions.openDrawer())}>
            <View style={styles.button}>
                <HamburgerMenuIcon />
            </View>
        </TouchableNativeFeedback>
    );

    const returnButton = () => (
        <TouchableNativeFeedback onPress={onReturnButtonPress}>
            <View style={styles.button}>
                <BackIcon style={styles.icon} />
            </View>
        </TouchableNativeFeedback>
    );

    const onSearchButtonPress = () => {
        navigation?.setOptions({
            headerLeft: returnButton,
            headerTitle: () => (
                <Searchbar
                    placeholder="Поиск"
                    onChangeText={setQuery}
                    value={query}
                    style={styles.searchbar}
                    autoFocus={true}
                />
            ),
            headerRight: () => '',
        });
        setSearchOpened(true);
    };

    const onReturnButtonPress = () => {
        navigation?.setOptions({
            headerLeft: hamburgerButton,
            headerTitle: () => (
                <Text style={styles.title}>{navigation.sc}</Text>
            ),
            headerRight: searchButton,
        });
    };

    useLayoutEffect(() => {
        if (!searchOpened) {
            navigation?.setOptions({
                headerRight: searchButton,
            });
        }
    }, [navigation, query, searchOpened]);
    useFocusEffect(
        useCallback(() => {
            loadData();
        }, [loadData]),
    );

    return (
        <ScreenContainer style={styles.container}>
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
