import React from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Alert,TouchableOpacity,Text
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native'; // For React Navigation v5+
import Icon from 'react-native-vector-icons/Ionicons';
import Pdf from 'react-native-pdf'; // Note: 'Pdf' not 'PDFView'

const PdfViewerScreen = ({ navigation }) => {
  const route = useRoute();
  const { pdfUrl } = route.params || {};
  const insets = useSafeAreaInsets();

  const source = { uri: pdfUrl || 'https://www.grtjewels.com/asia/wp-content/uploads/2016/06/singapore-catalogue.pdf?srsltid=AfmBOoriCd5awVMLcG7DrMxsJldvjN4H1w4FQhgXJZeyMse49yY4To1P', cache: true };

  const handleBack = () => {
    navigation.goBack();
  };

  const onLoadComplete = (numberOfPages, filePath) => {
    console.log(`PDF loaded: ${numberOfPages} pages`);
  };

  const onError = (error) => {
    console.log('PDF Error:', error);
    Alert.alert('Error', 'Failed to load PDF. Please check your connection and try again.');
  };

  const onPressLink = (uri) => {
    console.log(`Link pressed: ${uri}`);
    // Optionally open external links here
  };

  return (
    <SafeAreaView style={[styles.safeArea, {  }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Icon name="arrow-back" size={22} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>PDF Viewer</Text> {/* Optional title */}
        <View style={{ width: 22 }} /> {/* Spacer for layout balance */}
      </View>

      {/* PDF Viewer */}
      <View style={styles.pdfContainer}>
        <Pdf
          source={source}
          onLoadComplete={onLoadComplete}
          onError={onError}
          onPressLink={onPressLink}
          style={styles.pdf}
          horizontal={false} // Set to true for horizontal scrolling
          scale={1.0}
          minScale={1.0}
          maxScale={3.0}
          page={1} // Initial page
          spacing={0}
          fitPolicy={2} // 0: width, 1: height, 2: both (default)
          enableAnnotationRendering={true}
           trustAllCerts={false} 
        />
      </View>
    </SafeAreaView>
  );
};

export default PdfViewerScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: '#fff',
    paddingHorizontal: 18,
    paddingVertical: 14,
    // borderBottomWidth: 0.6,
    // borderBottomColor: '#E5E5E5',
    // elevation: 1,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  pdfContainer: {
    flex: 1,
  },
  pdf: {
    flex: 1,
    width: '100%',
    backgroundColor: '#F9F9F9',
  },
});