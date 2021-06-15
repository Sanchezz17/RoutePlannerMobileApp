import React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { Text, Title } from 'react-native-paper';

import LogoIcon from '../../components/icons/Screens/LogoIcon';
import { useAppSelector } from '../../redux/hooks';
import { selectCurrentUser } from '../../redux/users/selectors';
import { hasUserRight, Right } from '../../redux/users/types';
import { DrawerRoutes } from '../../routing/main/routes';
import { DrawerNavigationProps } from '../../routing/main/types';
import styles from './InfoScreen.styles';

type InfoScreenProps = DrawerNavigationProps<DrawerRoutes.Info>;

export const InfoScreen = ({ navigation }: InfoScreenProps) => {
    const currentUser = useAppSelector(selectCurrentUser);
    const currentUserIsSuperuser = hasUserRight(currentUser, Right.Superuser);
    const currentUserIsAdmin = hasUserRight(currentUser, Right.Admin);
    const currentUserIsManager = hasUserRight(currentUser, Right.Manager);
    const currentUserHasNoRole =
        !currentUserIsSuperuser && !currentUserIsAdmin && !currentUserIsManager;
    const currentUserRoleName = currentUserIsSuperuser
        ? 'Суперпользователь'
        : currentUserIsAdmin
        ? 'Администратор'
        : 'Менеджер';
    return (
        <SafeAreaView style={styles.background}>
            <LogoIcon style={styles.logoIcon} />
            <ScrollView
                style={styles.scrollView}
                contentInsetAdjustmentBehavior="automatic">
                <View style={styles.sectionContainer}>
                    <Title>RoutePlanner</Title>
                    <Text style={styles.paragraph}>
                        Приложение для составления удобных маршрутов для встреч
                    </Text>
                    <View style={styles.headerLine}>
                        <Title style={styles.header}>Ваша роль - </Title>
                        <Title style={styles.headerRole}>
                            {currentUserRoleName}
                        </Title>
                    </View>
                    {(currentUserIsSuperuser || currentUserIsAdmin) && [
                        <Text style={styles.paragraph}>
                            Новые пользователи, установившие приложение, будут
                            отображаться на вкладке “Заявки”. Если принять
                            заявку, пользователь сможет задавать себе график
                            работы, видеть информацию о встречах и отобразится
                            на вкладке “Менеджеры”
                        </Text>,
                        <Text style={styles.paragraph}>
                            На вкладке “Менеджеры” можно просматривать список
                            работников, видеть их контакты, графики и маршруты
                        </Text>,
                        <Text style={styles.paragraph}>
                            Добавить нового клиента можно с помощью вкладки
                            “Клиенты”. На этом же экране вносится информация о
                            встречах.
                        </Text>,
                        <Text style={styles.paragraph}>
                            На вкладке “Встречи” можно редактировать и удалять
                            назначенные встречи
                        </Text>,
                    ]}
                    {(currentUserIsSuperuser || currentUserIsManager) && [
                        <Text style={styles.paragraph}>
                            Для того, чтобы получить маршрут на сегодня,
                            необходимо задать время работы на вкладке “График”
                        </Text>,
                        <Text style={styles.paragraph}>
                            Через некоторое время после задания графика,
                            сформированное расписание встреч отобразится на
                            вкладке “Маршрут”
                        </Text>,
                    ]}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
