import React from 'react';
import { View, StyleSheet } from 'react-native';


const GoogleProfile = props => {
    const { photoURL, displayName, email } = this.props;
    return (
        <View style={styles.container}>
            {photoURL && (
                <Image
                    source={{
                        uri: photoURL,
                    }}
                    style={styles.image}
                />
            )}
            <View style={{ marginLeft: 12 }}>
                <Text style={styles.text}>{displayName}</Text>
                <Text style={styles.text}>{email}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      paddingHorizontal: 16,
      paddingVertical: 12,
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 24,
    },
    image: { width: 128, borderRadius: 64, aspectRatio: 1 },
    text: { color: 'black', fontSize: 16, fontWeight: '600' },
  });

  export default GoogleProfile;

// class GoogleProfile extends React.PureComponent {
//     render() {
//       const { photoURL, displayName, email } = this.props;
//       return (
//         <View style={styles.container}>
//           {photoURL && (
//             <Image
//               source={{
//                 uri: photoURL,
//               }}
//               style={styles.image}
//             />
//           )}
//           <View style={{ marginLeft: 12 }}>
//             <Text style={styles.text}>{displayName}</Text>
//             <Text style={styles.text}>{email}</Text>
//           </View>
//         </View>
//       );
//     }
//   }