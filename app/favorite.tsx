import { FlatList, Text } from "react-native";
import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MovieCard from "@/components/movieCard";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Favorite() {
    const [movies, setMovies] = useState<any[]>([]);

    const loadFav = async () => {
        const data = JSON.parse(
            (await AsyncStorage.getItem("fav")) || "[]"
        );
        setMovies(data);
    };

    useFocusEffect(
        useCallback(() => {
            loadFav();
        }, [])
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#0b1220" }}>
            <Text
                style={{
                    color: "white",
                    fontSize: 25,
                    padding: 10,
                }}
            >
                ❤️ Favorited Movies
            </Text>

            <FlatList
                data={movies}
                numColumns={2}
                keyExtractor={(item) => item.id.toString()}
                columnWrapperStyle={{ justifyContent: "space-between" }}
                contentContainerStyle={{ padding: 10 }}
                renderItem={({ item }) => <MovieCard movie={item} />}
            />
        </SafeAreaView>
    );
}