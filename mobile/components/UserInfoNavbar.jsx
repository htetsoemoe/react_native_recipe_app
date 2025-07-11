import { View, Text, Image, TouchableOpacity } from 'react-native'
import { authStyles } from '../assets/styles/auth.styles' 
import { useSelector, useDispatch } from 'react-redux'
import { selectUser } from '../redux/auth/authSelectors'
import { homeStyles } from '../assets/styles/home.styles'
import { logout } from '../redux/auth/authThunks';

const UserInfoNavbar = () => {
    const user = useSelector(selectUser)
    console.log(`user: ${JSON.stringify(user)}`)
    console.log(`username: ${user?.username}`)

    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(logout())
    }
    
    return (
        <View style={homeStyles.welcomeSection}>
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 10,
                marginTop: 10
            }}>
                <Image
                    source={require("../assets/images/chef.png")}
                    style={{
                        width: 40,
                        height: 40,
                    }}
                />
                <Text style={authStyles.username}>
                    {user?.username}
                </Text>
            </View>
            <View>
                <TouchableOpacity
                    onPress={handleLogout}
                >
                    <Text style={authStyles.linkText}>
                        <Text style={authStyles.link}>Logout</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default UserInfoNavbar