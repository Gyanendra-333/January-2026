import { useState, useEffect } from 'react';

function App() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(res => res.json())
            .then(json => setData(json));
    }, []);

    return (
        <div>
            {data.map(item => <p key={item.id}>{item.title}</p>)}
        </div>
    );
}

export default App;







import { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';

function App() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(res => res.json())
            .then(json => setData(json));
    }, []);

    return (
        <FlatList
            data={data}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => <Text>{item.title}</Text>}
        />
    );
}


import { useState, useEffect } from 'react';
import {
    View, Text, FlatList,
    ActivityIndicator, StyleSheet
} from 'react-native';

export default function PostsScreen() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const response = await fetch('https://jsonplaceholder.typicode.com/posts');

            if (!response.ok) throw new Error('Something went wrong!');

            const json = await response.json();
            setPosts(json.slice(0, 20)); // only first 20 posts
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // 👇 Show spinner while loading
    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#6200ee" />
                <Text>Loading...</Text>
            </View>
        );
    }

    // 👇 Show error message if failed
    if (error) {
        return (
            <View style={styles.center}>
                <Text style={styles.error}>❌ {error}</Text>
            </View>
        );
    }

    // 👇 Show data
    return (
        <FlatList
            data={posts}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
                <View style={styles.card}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.body}>{item.body}</Text>
                </View>
            )}
        />
    );
}

const styles = StyleSheet.create({
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    error: { color: 'red', fontSize: 16 },
    card: {
        backgroundColor: '#fff',
        margin: 10,
        padding: 15,
        borderRadius: 10,
        elevation: 3, // shadow on Android
        shadowColor: '#000', // shadow on iOS
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    title: { fontWeight: 'bold', fontSize: 14, marginBottom: 5 },
    body: { color: '#555', fontSize: 12 },
});

