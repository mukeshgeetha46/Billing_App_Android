import { DrawerActions, useNavigation } from '@react-navigation/native';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '../ui/icon-symbol';

export default function AppHeader() {
    const navigation = useNavigation();

    return (
        <SafeAreaView edges={['top']} style={styles.safe}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                >
                    <IconSymbol name="line.3.horizontal" size={28} color="#333" />
                </TouchableOpacity>

                <View style={styles.headerTitleContainer}>
                    <View style={styles.headerIconBg}>
                        <IconSymbol name="house.fill" size={18} color="#FFF" />
                    </View>
                    <Text style={styles.headerTitle}>Wholesale Hub</Text>
                </View>

                <TouchableOpacity>
                    <IconSymbol name="bell" size={24} color="#333" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    safe: {
        backgroundColor: '#fff',
    },
    header: {
        height: 56,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        backgroundColor: '#fff',
        borderBottomLeftRadius: 14,
        borderBottomRightRadius: 14,

    },
    headerTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerIconBg: {
        backgroundColor: '#2563EB',
        borderRadius: 8,
        padding: 4,
        marginRight: 8,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#111',
    },
});
