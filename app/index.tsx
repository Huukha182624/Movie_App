import { Text, FlatList } from "react-native";
import { getTrending, searchMovie } from "@/api/tmdb";
import { useEffect, useState } from "react";
import MovieCard from "../components/movieCard";
import Header from "@/components/Header";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
    const [movies, setMovies] = useState<any[]>([]);
    const [keyword, setKeyword] = useState("");
    const [isSearching, setIsSearching] = useState(false);

    const fetchTrending = async () => {
        const res = await getTrending();
        setMovies(res.data.results);
    };

    const handleSearch = async () => {
        if (!keyword.trim()) {
            fetchTrending();
            return;
        }

        const res = await searchMovie(keyword);
        setMovies(res.data.results);
        setIsSearching(true);
    };

    useEffect(() => {
        fetchTrending();
    }, []);


    return (
        <SafeAreaView edges={["top"]} style={{ flex: 1, backgroundColor: "#0b1220" }}>
            <Header
                keyword={keyword}
                setKeyword={setKeyword}
                onSearch={handleSearch}
            />

            {!isSearching ? (
                <Text
                    style={{
                        color: "white",
                        fontSize: 20,
                        paddingLeft: 10,
                        marginBottom: 5,
                    }}
                >
                    🔥 Top 20 Trending Now
                </Text>
            ) : (
                <Text
                    style={{
                        color: "white",
                        fontSize: 25,
                        paddingLeft: 10,
                        marginBottom: 5,
                    }}
                >
                    🔍 Search Result
                </Text>
            )}

            <FlatList
                data={movies}
                numColumns={2}
                keyExtractor={(item) => item.id.toString()}
                columnWrapperStyle={{
                    justifyContent: "space-between",
                    paddingHorizontal: 15,
                }}
                contentContainerStyle={{
                    paddingBottom: 30,
                }}
                renderItem={({ item }) => <MovieCard movie={item} />}
            />
        </SafeAreaView>
    );
}
