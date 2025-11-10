// import React from 'react';
// import { View, StyleSheet, TouchableOpacity, StatusBar, SafeAreaView, Dimensions } from 'react-native';
// import Video from 'react-native-video';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { useNavigation } from '@react-navigation/native';

// const { width, height } = Dimensions.get('window');

// const VideoScreen = ({ route }) => {
//   const navigation = useNavigation();
//   const { videoUri } = route.params; // Pass video URL from HomeScreen

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar translucent={true} backgroundColor="#000" barStyle="light-content" />
//       <View style={styles.fullScreenContainer}>
//         <Video
//           source={{ uri: videoUri }}
//           style={styles.fullScreenVideo}
//           resizeMode="cover"
//           repeat={true}
//           controls={true} // Enable native video controls (play/pause, seek bar)
//           onError={(error) => console.error('Video error:', error)}
//         />
//         <TouchableOpacity
//           style={styles.closeButton}
//           onPress={() => navigation.goBack()}
//           accessibilityLabel="Close video"
//         >
//           <Ionicons name="close" size={30} color="#fff" />
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#000',
//   },
//   fullScreenContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   fullScreenVideo: {
//     width,
//     height,
//   },
//   closeButton: {
//     position: 'absolute',
//     top: 20,
//     right: 20,
//     backgroundColor: 'rgba(255, 0, 0, 0.6)',
//     borderRadius: 20,
//     padding: 8,
//     zIndex: 1000, // Ensure close button is above video controls
//   },
// });
// export default VideoScreen;
import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Dimensions,
  ActivityIndicator,
  AppState,
} from 'react-native';
import Video from 'react-native-video';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const VideoScreen = ({ route }) => {
  const navigation = useNavigation();
  const { videoUri } = route.params;
  const [isBuffering, setIsBuffering] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    // Pause video when app goes background or minimized
    const subscription = AppState.addEventListener('change', (nextState) => {
      if (nextState.match(/inactive|background/)) {
        setPaused(true);
      } else {
        setPaused(false);
      }
    });

    // Cleanup on unmount
    return () => {
      subscription.remove();
      setIsBuffering(false);
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="#000" barStyle="light-content" />
      <View style={styles.fullScreenContainer}>
        <Video
          source={{ uri: videoUri }}
          style={styles.fullScreenVideo}
          resizeMode="contain" // keep video aspect ratio
          controls
          paused={paused}
          repeat={false}
          playInBackground={false}
          playWhenInactive={false}
          preventsDisplaySleepDuringVideoPlayback={true}
          useTextureView={false} // fixes crashes on some Android devices
          onBuffer={({ isBuffering }) => setIsBuffering(isBuffering)}
          onError={(error) =>
            console.error('Video playback error:', JSON.stringify(error, null, 2))
          }
          onEnd={() => console.log('Playback finished')}
        />

        {isBuffering && (
          <ActivityIndicator
            size="large"
            color="#fff"
            style={styles.bufferingIndicator}
          />
        )}

        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.goBack()}
          accessibilityLabel="Close video"
        >
          <Ionicons name="close" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  fullScreenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  fullScreenVideo: {
    width: width,
    height: height * 0.6, // centered and not full height
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 20,
    padding: 8,
    zIndex: 10,
  },
  bufferingIndicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }],
  },
});

export default VideoScreen;

