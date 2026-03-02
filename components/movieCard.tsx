
import { useRouter } from "expo-router";
import { Text, Image, Pressable, StyleSheet, View } from "react-native";

export default function MovieCard({ movie }: any) {
    const router = useRouter();

    return (
        <Pressable
            onPress={() => router.push(`/detail?id=${movie.id}`)}
            style={({ pressed }) => [
                styles.card,
                { transform: [{ scale: pressed ? 0.96 : 1 }] },
            ]}
        >
            <Image
                source={{
                    uri: process.env.EXPO_PUBLIC_IMAGE + movie.poster_path,
                }}
                style={styles.poster}
            />

            <View style={styles.info}>
                <Text numberOfLines={1} style={styles.title}>
                    {movie.title}
                </Text>

                <View style={styles.bottomRow}>
                    <Text style={styles.year}>
                        {movie.release_date?.slice(0, 4)}
                    </Text>

                    <View style={styles.ratingBadge}>
                        <Text style={styles.rating}>
                            ⭐ {movie.vote_average?.toFixed(1)}
                        </Text>
                    </View>
                </View>
            </View>
        </Pressable>
    );
}
const styles = StyleSheet.create({
    card: {
        width: "48%",
        marginBottom: 18,
        borderRadius: 18,
        backgroundColor: "#111111",
        overflow: "hidden",
    },

    poster: {
        width: "100%",
        height: 230,
    },

    info: {
        padding: 10,
    },

    title: {
        color: "#FFFFFF",
        fontSize: 20,
        fontWeight: "600",
    },

    bottomRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 6,
    },

    year: {
        color: "#fffdfd",
        fontSize: 16,
    },

    ratingBadge: {
        backgroundColor: "#F5C518",
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 8,
    },

    rating: {
        fontSize: 15,
        fontWeight: "bold",
    },
});
