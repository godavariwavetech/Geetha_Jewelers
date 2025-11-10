import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  StatusBar,
  Alert,
  Platform,
  Dimensions,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const {width} = Dimensions.get('window');

function Profile({navigation}) {
  const insets = useSafeAreaInsets();
  const [name, setName] = useState('Radha Peters');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+91 6578578849');
  const [imageUri, setImageUri] = useState(require('../assets/profile1.png'));

  const selectImageOption = () => {
    Alert.alert(
      'Update Profile Picture',
      'Choose an option',
      [
        {text: 'Camera', onPress: openCamera},
        {text: 'Gallery', onPress: openGallery},
        {text: 'Cancel', style: 'cancel'},
      ],
      {cancelable: true},
    );
  };

  const openCamera = () => {
    launchCamera(
      {mediaType: 'photo', cameraType: 'front', saveToPhotos: true},
      response => {
        if (!response.didCancel && !response.errorCode) {
          const uri = response.assets[0].uri;
          setImageUri({uri});
        }
      },
    );
  };

  const openGallery = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (!response.didCancel && !response.errorCode) {
        const uri = response.assets[0].uri;
        setImageUri({uri});
      }
    });
  };

  const onSave = () => {
    Alert.alert('Profile Saved', 'Your profile information has been saved.');
  };

  return (
    <View style={[styles.container, {paddingTop: insets.top, paddingBottom: insets.bottom}]}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation?.goBack()}>
          <Ionicons name="chevron-back" size={26} color="rgba(8, 118, 90, 1)" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Profile</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom:40}}>
        <View style={styles.avatarWrap}>
          <Image source={imageUri} style={styles.avatar} />
          <TouchableOpacity style={styles.editBtn} onPress={selectImageOption}>
            <MaterialCommunityIcons name="pencil-outline" size={20} color="rgba(8, 118, 90, 1)" />
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Name</Text>
        <View style={styles.inputCard}>
          <TextInput value={name} onChangeText={setName} style={styles.input} />
          <MaterialCommunityIcons name="pencil-outline" size={20} color="#c6b6af" />
        </View>

        <Text style={styles.label}>Email ID</Text>
        <View style={styles.inputCard}>
          <TextInput
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            placeholder="Email address"
            placeholderTextColor="gray"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <Text style={styles.label}>Mobile Number</Text>
        <View style={styles.inputCard}>
          <TextInput value={phone} style={styles.input} editable={false} selectTextOnFocus={false} />
        </View>

        <TouchableOpacity style={styles.saveBtn} onPress={onSave}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {backgroundColor: '#fff', flex: 1},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 12,
    paddingTop: 16,
    backgroundColor: '#fff',
  
  },
  headerText: {
    fontWeight: '700',
    fontSize: 18,
    marginLeft: 10,
    color: 'rgba(8, 118, 90, 1)',
  },
 
  
  label: {
    marginLeft: 25,
    color: '#767676',
    fontSize: 13,
    marginBottom: 3,
    marginTop: 14,
    fontWeight: '500',
  },
  inputCard: {
    backgroundColor: '#fff',
    marginHorizontal: 18,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#f0ece8',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 5,
    elevation: 1,
    marginBottom: 2,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#222',
    fontWeight: '500',
    paddingVertical: 6,
    paddingRight: 10,
    paddingLeft: 1,
  },
  saveBtn: {
    marginTop: 40,
    marginHorizontal: 18,
    backgroundColor: 'rgba(8, 118, 90, 1)',
    borderRadius: 10,
    paddingVertical: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
  },
   avatarWrap: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 32,
    position: 'relative',
  },
  avatar: {
    width: 86,
    height: 86,
    borderRadius: 43,
    borderWidth: 2.5,
    borderColor: '#fff',
    backgroundColor: '#f2f2f2',
  },
editBtn: {
    position: 'absolute',
    right: width / 2 - 86 / 2 - 2,
    bottom: 8,
    backgroundColor: '#fff',
    padding: 2,
    borderRadius: 18,
    borderWidth: 0.6,
    borderColor: '#e2dedc',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 2,
  },
});

export default Profile;