import { useChatBadgeContext } from "@/hooks/provider/ChatBadgeProvider";
import { Ionicons } from "@expo/vector-icons";
import { Tabs, useSegments } from "expo-router";

const TabLayout = () => {
    const segments = useSegments();
    const {badgeCount} = useChatBadgeContext();
    
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "#FFA001",
                tabBarInactiveTintColor: "#CDCDE0",
                tabBarStyle: {
                    display: segments[segments.length - 1] === "[id]" ? 'none' : 'flex',
                    backgroundColor: "#161622",
                    borderTopWidth: 2,
                    borderTopColor: "#232533"
                },
                sceneStyle: {
                    backgroundColor: "#161622"
                }
            }}
        >
            <Tabs.Screen
                name="chat"
                options={{
                    title: "Chat",
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="chatbubbles" size={size} color={color} />
                    ),
                    tabBarBadge: badgeCount === 0 ? undefined : badgeCount
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person" size={size} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
};

export default TabLayout;
