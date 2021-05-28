import DateTimePicker from '@react-native-community/datetimepicker';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { DrawerActions, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AsyncThunkAction } from '@reduxjs/toolkit';
import React, {
    ReactElement,
    useCallback,
    useLayoutEffect,
    useState,
} from 'react';
import {
    FlatList,
    Platform,
    TouchableNativeFeedback,
    TouchableOpacity,
    View,
} from 'react-native';
import { Searchbar, Text } from 'react-native-paper';
import { Title } from 'react-native-paper';
import { ScreenContainer } from 'react-native-screens';

import { DEFAULT_LIMIT } from '../../common/constants';
import { DAY_MILLISECONDS } from '../../common/utils/dateUtils';
import BackIcon from '../../components/icons/Header/BackIcon';
import ForwardIcon from '../../components/icons/Header/ForwardIcon';
import HamburgerMenuIcon from '../../components/icons/Header/HamburgerMenuIcon';
import SearchIcon from '../../components/icons/Header/SearchIcon';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { selectCurrentUser } from '../../redux/users/selectors';
import styles from './ListScreen.styles';

interface SearchParameters {
    managerId?: number;
    offset?: number;
    limit?: number;
    query?: string;
    date?: Date;
    weekDate?: Date;
}

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
        parameters: SearchParameters,
    ) => AsyncThunkAction<T[], SearchParameters, {}>;
    loadMoreDataThunk: (
        parameters: SearchParameters,
    ) => AsyncThunkAction<T[], SearchParameters, {}>;
    children?: Element;
    navigation?: StackNavigationProp<any, any> | DrawerNavigationProp<any, any>;
    screenTitle?: string;
    useDateSelector?: boolean;
    dateSelectorStartDate?: Date;
    dateSelectorStep?: number;
    onDateChange?: (date: Date) => void;
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
    screenTitle,
    useDateSelector = false,
    dateSelectorStartDate = new Date(),
    dateSelectorStep = 1,
    onDateChange = () => {},
}: ListWithSearchProps<T>) => {
    const dispatch = useAppDispatch();
    const data = useAppSelector(dataSelector);
    const loadingData = useAppSelector(loadingSelector);
    const currentUser = useAppSelector(selectCurrentUser);
    const [date, setDate] = useState(dateSelectorStartDate);
    const [showPicker, setShowPicker] = useState(false);
    const [query, setQuery] = useState('');
    const [searchOpened, setSearchOpened] = useState(false);
    const [expandedCardIndex, setExpandedCardIndex] = useState(-1);
    const loadData = useCallback(
        (offset: number = 0) => {
            dispatch(
                loadDataThunk({
                    managerId: currentUser.id,
                    offset: offset,
                    limit: DEFAULT_LIMIT,
                    query: query,
                    date: date,
                }),
            );
        },
        [dispatch, loadDataThunk, query, date],
    );
    const searchButton = () => (
        <TouchableNativeFeedback onPress={() => setSearchOpened(true)}>
            <View style={styles.button}>
                <SearchIcon style={styles.icon} />
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
        <TouchableNativeFeedback onPress={() => setSearchOpened(false)}>
            <View style={styles.button}>
                <BackIcon style={styles.icon} />
            </View>
        </TouchableNativeFeedback>
    );
    useLayoutEffect(() => {
        if (!searchOpened) {
            navigation?.setOptions({
                headerLeft: hamburgerButton,
                headerTitle: () => (
                    <Title style={styles.title}>{screenTitle}</Title>
                ),
                headerRight: searchButton,
            });
            setQuery('');
        } else {
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
        }
    }, [navigation, query, screenTitle, searchOpened]);
    useFocusEffect(
        useCallback(() => {
            loadData();
        }, [loadData]),
    );

    return (
        <ScreenContainer style={styles.container}>
            {useDateSelector && (
                <View style={styles.dateSelector}>
                    <TouchableOpacity
                        style={styles.iconContainer}
                        onPress={() => {
                            const newDate = new Date(
                                date.getTime() -
                                    dateSelectorStep * DAY_MILLISECONDS,
                            );
                            setDate(newDate);
                            onDateChange(date);
                        }}>
                        <BackIcon style={styles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.dateContainer}
                        onPress={() => setShowPicker(true)}>
                        <Text style={styles.date}>
                            {date.toLocaleDateString()}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.iconContainer}
                        onPress={() => {
                            const newDate = new Date(
                                date.getTime() +
                                    dateSelectorStep * DAY_MILLISECONDS,
                            );
                            setDate(newDate);
                            onDateChange(date);
                        }}>
                        <ForwardIcon style={styles.icon} />
                    </TouchableOpacity>
                </View>
            )}
            {showPicker && (
                <DateTimePicker
                    value={date}
                    mode={'date'}
                    display="default"
                    onChange={(event: any, selectedDate: Date | undefined) => {
                        setShowPicker(Platform.OS === 'ios');
                        setDate(selectedDate ?? date);
                    }}
                />
            )}
            <FlatList
                data={data}
                refreshing={loadingData}
                onRefresh={loadData}
                onEndReachedThreshold={0.01}
                onEndReached={({ distanceFromEnd }) => {
                    if (distanceFromEnd < -1) {
                        return;
                    }
                    dispatch(
                        loadMoreDataThunk({
                            offset: data.length,
                            limit: DEFAULT_LIMIT,
                            query: query,
                            date: date,
                            managerId: currentUser.id,
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
