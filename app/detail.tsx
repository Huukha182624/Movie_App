import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { getMovieDetail, getMovieTrailer } from "@/api/tmdb";
import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import YoutubePlayer from "react-native-youtube-iframe";

export default function Detail() {
    const { id } = useLocalSearchParams();

    const [movie, setMovie] = useState<any>();
    const [isFav, setIsFav] = useState(false);
    const [trailer, setTrailer] = useState<string | null>(null);
    const [playing, setPlaying] = useState(false);

    useEffect(() => {
        if (!id) return;

        const fetchData = async () => {
            const res = await getMovieDetail(id as string);
            setMovie(res.data);

            loadTrailer(id as string);
        };

        fetchData();
    }, [id]);

    const loadTrailer = async (movieId: string) => {
        try {
            const res = await getMovieTrailer(movieId);
            const videos = res?.data?.results || [];

            const youtubeTrailer = videos.find(
                (v: any) =>
                    v.site === "YouTube" &&
                    (v.type === "Trailer" || v.type === "Teaser")
            );

            if (youtubeTrailer) {
                setTrailer(youtubeTrailer.key);
            } else if (videos.length > 0) {
                setTrailer(videos[0].key);
            }
        } catch (err) {
            console.log("TRAILER ERROR:", err);
        }
    };

    useEffect(() => {
        if (movie) checkFavorite();
    }, [movie]);

    const checkFavorite = async () => {
        if (!movie) return;

        const fav = JSON.parse((await AsyncStorage.getItem("fav")) || "[]");
        const found = fav.find((m: any) => m.id === movie.id);
        setIsFav(!!found);
    };

    const toggleFavorite = async () => {
        const fav = JSON.parse((await AsyncStorage.getItem("fav")) || "[]");

        if (isFav) {
            const newFav = fav.filter((m: any) => m.id !== movie.id);
            await AsyncStorage.setItem("fav", JSON.stringify(newFav));
            setIsFav(false);
        } else {
            await AsyncStorage.setItem("fav", JSON.stringify([...fav, movie]));
            setIsFav(true);
        }
    };

    const onStateChange = useCallback((state: string) => {
        if (state === "ended") {
            setPlaying(false);
        }
    }, []);

    if (!movie) return null;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#0b1220" }}>
            <ScrollView style={{ backgroundColor: "#0b1220" }}>
                <Image
                    source={{
                        uri: process.env.EXPO_PUBLIC_IMAGE + movie.poster_path,
                    }}
                    style={{ height: 420, width: "100%" }}
                    resizeMode="cover"
                />

                <View style={{ padding: 15 }}>
                    <Text style={{ color: "white", fontSize: 25 }}>
                        {movie.title}
                    </Text>

                    <Text style={{ color: "#00bfff", fontSize:15 }}>
                        ⭐ {movie.vote_average}
                    </Text>

                    <Text style={{ color: "#ccc", marginVertical: 10, fontSize:16 }}>
                        {movie.overview}
                    </Text>

                    {/* FAVORITE BUTTON */}
                    <TouchableOpacity
                        onPress={toggleFavorite}
                        style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
                    >
                        <Ionicons
                            name={isFav ? "heart" : "heart-outline"}
                            size={26}
                            color={isFav ? "red" : "#777"}
                        />

                        <Text
                            style={{
                                color: isFav ? "red" : "#999",
                                fontSize: 16,
                            }}
                        >
                            {isFav ? "Favorited" : "Favorite"}
                        </Text>
                    </TouchableOpacity>


                </View>

                {trailer && (
                    <View style={{ paddingHorizontal: 15, marginTop: 20 }}>
                        <Text style={{ color: "white", fontSize: 18, marginBottom: 10 }}>
                            🎬 Trailer
                        </Text>

                        <YoutubePlayer
                            height={220}
                            play={playing}
                            videoId={trailer}
                            onChangeState={onStateChange}
                        />
                    </View>
                )}

            </ScrollView>
        </SafeAreaView>
    );
}
