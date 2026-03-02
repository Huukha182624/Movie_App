import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Header({ keyword, setKeyword, onSearch }: any) {
    const router = useRouter();

    return (
        <View style={styles.container}>

            {/* HÀNG 1: LOGO + HEART */}
            <View style={styles.topRow}>
                <Text style={styles.logo}>🎬 MovieApp</Text>

                <TouchableOpacity onPress={() => router.push("/favorite")}>
                    <Ionicons name="heart" size={30} color="red" />
                </TouchableOpacity>
            </View>

            {/* HÀNG 2: SEARCH */}
            <View style={styles.searchBox}>
                <Ionicons name="search" size={18} color="#777" />

                <TextInput
                    placeholder="Search movie..."
                    placeholderTextColor="#777"
                    value={keyword}
                    onChangeText={setKeyword}
                    onSubmitEditing={onSearch}
                    style={styles.searchInput}
                />

                {keyword.length > 0 && (
                    <TouchableOpacity onPress={() => setKeyword("")}>
                        <Ionicons name="close-circle" size={18} color="#777" />
                    </TouchableOpacity>
                )}
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingTop: 10,
        paddingBottom: 15,
        backgroundColor: "#050b18",
    },

    topRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    logo: {
        color: "#ffffff",
        fontSize: 30,
        fontWeight: "bold",
        letterSpacing: 1,
    },

    searchBox: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#1c1c1c",
        borderRadius: 15,
        paddingHorizontal: 12,
        marginTop: 15,
        height: 45,
    },

    searchInput: {
        flex: 1,
        color: "#fff",
        marginHorizontal: 8,
        fontSize: 20,
    },
});