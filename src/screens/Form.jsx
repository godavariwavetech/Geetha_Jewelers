import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  Alert,
  ActivityIndicator, // For loading spinner
} from 'react-native';
import axios from 'axios';

const Form = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submittedData, setSubmittedData] = useState([]);
  const [loading, setLoading] = useState(false); // New: Loading state

  const handleSubmit = async () => {
    console.log('=== Submit Button Pressed ==='); // Log 1: Confirms onPress works

    if (!name || !email || !password) {
      console.log('Validation failed: Missing fields'); // Log 2
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    console.log('Validation passed. Starting API calls...'); // Log 3

    setLoading(true); // Show spinner

    try {
      // Step 1: Submit to backend
      console.log('Making POST request...'); // Log 4
      const response = await axios.post('http://192.168.0.145:3000/api/submit', {
        name,
        email,
        password,
      });
      console.log('POST Response:', response.data); // Log 5: See server reply

      if (response.data.success) {
        console.log('POST success! Fetching data...'); // Log 6
        Alert.alert('Success', 'Data submitted!');
        
        // Step 2: Fetch all data from backend and display
        const fetchResponse = await axios.get('http://192.168.0.145:3000/api/data');
        console.log('GET Response:', fetchResponse.data); // Log 7

        if (fetchResponse.data.success) {
          console.log('Setting submitted data:', fetchResponse.data.data); // Log 8
          setSubmittedData(fetchResponse.data.data);
        }

        // Clear form
        setName('');
        setEmail('');
        setPassword('');
      } else {
        console.log('Server said not success:', response.data); // Log 9
        Alert.alert('Error', 'Server responded but submission failed.');
      }
    } catch (error) {
      console.error('Full Error Object:', error); // Log 10: Detailed error
      console.error('Error Message:', error.message); // Log 11

      let errorMsg = 'Failed to submit data. Check server connection.';
      if (error.code === 'ERR_NETWORK') {
        errorMsg = 'Network error: Check internet or server IP.';
      } else if (error.response) {
        // Server responded with error (e.g., 500)
        errorMsg = `Server error (${error.response.status}): ${error.response.data?.error || 'Unknown'}`;
      }

      Alert.alert('Error', errorMsg);
    } finally {
      setLoading(false); // Hide spinner
      console.log('=== Submit Process Ended ==='); // Log 12
    }
  };

  const renderCustomer = ({ item }) => (
    <View style={styles.customerItem}>
      <Text>ID: {item.id}</Text>
      <Text>Name: {item.name}</Text>
      <Text>Email: {item.email}</Text>
      <Text>Password: {item.password} (hidden in prod)</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Customer Form</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      <Button 
        title={loading ? "Submitting..." : "Submit"} 
        onPress={handleSubmit} 
        disabled={loading} // Disable during load
      />
      
      {loading && (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />
      )}
      
      {submittedData.length > 0 && (
        <View style={styles.dataSection}>
          <Text style={styles.sectionTitle}>Submitted Data:</Text>
          <FlatList
            data={submittedData}
            renderItem={renderCustomer}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  loading: {
    marginTop: 10,
  },
  dataSection: {
    marginTop: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  customerItem: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default Form;