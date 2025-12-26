
import { Link, Redirect, Stack } from 'expo-router';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';

export default function LandingPage() {
    // Redirect native users directly to the app
    if (Platform.OS !== 'web') {
        return <Redirect href="/home" />;
    }

    return (
        <View style={styles.container}>
            <View style={styles.hero}>
                <Stack.Screen options={{ title: 'CryptoBall' }} />
                <Text style={styles.appName}>CryptoBall</Text>
                <Text style={styles.subtitle}>
                    AI-powered technical analysis for cryptocurrency charts.
                    Upload a screenshot and let the future reveal itself.
                </Text>

                <Link href="https://apps.apple.com/us/app/cryptofore/id6755981344" asChild>
                    <Pressable style={styles.secondaryButton}>
                        <Text style={styles.secondaryButtonText}>Download on the App Store</Text>
                    </Pressable>
                </Link>

                <Link href="/home" asChild>
                    <Pressable style={styles.button}>
                        <Text style={styles.buttonText}>Launch Web App</Text>
                    </Pressable>
                </Link>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000', // Premium dark theme
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    hero: {
        maxWidth: 800,
        width: '100%',
        alignItems: 'center',
        gap: 20,
    },
    title: {
        fontSize: 24,
        color: '#888',
        letterSpacing: 4,
        textTransform: 'uppercase',
        fontWeight: '600',
    },
    appName: {
        fontSize: 64,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        // Add a gradient effect if possible, but basic white is cleaner for now
    },
    subtitle: {
        fontSize: 20,
        color: '#ccc',
        textAlign: 'center',
        maxWidth: 600,
        lineHeight: 30,
        marginBottom: 40,
    },
    button: {
        backgroundColor: '#fff',
        paddingHorizontal: 40,
        paddingVertical: 20,
        borderRadius: 50,
        shadowColor: '#fff',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 5,
    },
    buttonText: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
    },
    secondaryButton: {
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#fff',
    },
    secondaryButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});
