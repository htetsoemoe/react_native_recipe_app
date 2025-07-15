import { StyleSheet, Dimensions } from "react-native";
import { COLORS } from "../../constants/colors";
const { width } = Dimensions.get("window");
const cardWidth = (width - 48) / 2;

export const favoritesStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        padding: 15,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    title: {
        fontSize: 32,
        fontWeight: "800",
        color: COLORS.text,
        letterSpacing: -0.5,
        marginBottom: 15,
    },
    logoutButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.card,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: COLORS.shadow,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    statsContainer: {
        flexDirection: "row",
        paddingHorizontal: 16,
        marginTop: 24,
        gap: 12,
    },
    statCard: {
        flex: 1,
        backgroundColor: COLORS.card,
        borderRadius: 16,
        padding: 16,
        alignItems: "center",
        shadowColor: COLORS.shadow,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    statIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 8,
    },
    statValue: {
        fontSize: 18,
        fontWeight: "bold",
        color: COLORS.text,
    },
    recipesSection: {
        paddingHorizontal: 16,
        marginTop: 24,
        paddingBottom: 32,
    },
    recipesGrid: {
        gap: 16,
    },
    row: {
        justifyContent: "space-between",
    },
    emptyState: {
        alignItems: "center",
        paddingVertical: 64,
        paddingHorizontal: 32,
    },
    emptyIconContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: COLORS.card,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 24,
        borderWidth: 2,
        borderColor: COLORS.border,
        borderStyle: "dashed",
    },
    emptyTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: COLORS.text,
        marginBottom: 24,
    },
    exploreButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.primary,
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 24,
        gap: 8,
    },
    exploreButtonText: {
        fontSize: 16,
        fontWeight: "600",
        color: COLORS.white,
    },
    favoriteGrid: {
        gap: 16,
        paddingBottom: 32,
    }
});

export const favoriteCardStyles = StyleSheet.create({
    container: {
        width: cardWidth,
        backgroundColor: COLORS.card,
        borderRadius: 16,
        marginBottom: 16,
        shadowColor: COLORS.shadow,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
        overflow: "hidden",
    },
    imageContainer: {
        position: "relative",
        height: 140,
    },
    image: {
        width: "100%",
        height: "100%",
        backgroundColor: COLORS.border,
    },
    content: {
        padding: 12,
    },
    title: {
        fontSize: 15,
        fontWeight: "700",
        color: COLORS.text,
        marginBottom: 4,
        lineHeight: 20,
    },
    description: {
        fontSize: 12,
        color: COLORS.textLight,
        marginBottom: 8,
        lineHeight: 16,
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 7,
        margin: 5,
    },
    timeContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    timeText: {
        fontSize: 11,
        color: COLORS.textLight,
        marginLeft: 4,
        fontWeight: "500",
    },
    servingsContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    servingsText: {
        fontSize: 11,
        color: COLORS.textLight,
        marginLeft: 4,
        fontWeight: "500",
    },
})

export const favoriteCardButtonStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        paddingHorizontal: 10,
    },
    recipeCardButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: 8,
        borderRadius: 6,
        marginTop: 5,
        marginBottom: 30,
        paddingHorizontal: 15,
    },
    recipeDeleteButton: {
        backgroundColor: "red",
        paddingVertical: 8,
        borderRadius: 6,
        marginTop: 5,
        marginBottom: 30,
        paddingHorizontal: 15,
    },
    buttonDisabled: {
        opacity: 0.7,
    },
    linkText: {
        fontSize: 16,
        color: COLORS.textLight,
    },
    cardTextLink: {
        fontSize: 12,
        color: COLORS.primary,
        fontWeight: "600",
        color: "white",
    },
    cardDeleteTextLink: {
        fontSize: 12,
        color: COLORS.primary,
        fontWeight: "600",
        color: "white",
    }
})
