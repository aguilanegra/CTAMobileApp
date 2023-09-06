import React, {useState, useEffect} from 'react';
import {Alert, View, Text, TextInput, Image, FlatList, StyleSheet, Pressable} from 'react-native';
import {useVideoModal} from '../components/VideoPlayerModalContext';
import {useSelector} from 'react-redux';
import {getCredentials} from '../storage';
import Icon from 'react-native-vector-icons/FontAwesome';

interface VideoData {
  id: number;
  vimeoid: number;
  title: string;
  thumburl: string;
  link: string;
}

const LessonPlansListing: React.FC = () => {
  const [videos, setVideos] = useState<VideoData[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<VideoData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [mappedVideos, setMappedVideos] = useState<VideoData[]>([]); // New state variable
  const cachedVideosData = useSelector((state) => state.cachedVideos);
  const {openVideoModal} = useVideoModal();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(
          'https://caioterra.com/app-api/get-plans.php',
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const apiData = await response.json();

        if (Array.isArray(apiData)) {
          setVideos(apiData);
          setFilteredVideos(apiData);
        } else {
        }
      } catch (error) {
        console.error('Error fetching videos:', error);
        Alert.alert('Error', `There was an error getting the lesson plans: ${error}`);
      }
    };

    fetchVideos();
  }, []);

  const handleSearch = (text: string) => {
    const filtered = videos.filter(video =>
      video.title.toLowerCase().includes(text.toLowerCase()),
    );
    setSearchTerm(text);
    //setMappedVideos(filtered);
  };

  const fetchPlanVideoDetailsById = async (id: number) => {
    try {
      const response = await fetch(
        `https://caioterra.com/app-api/plan-videos.php?id=${id}`,
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const apiData = await response.json();
      return apiData;
    } catch (error) {
      console.error('Error fetching plan video details:', error);
      Alert.alert('Error', `There was an error getting the plans details: ${error}`);
      return [];
    }
  };

  const fetchAndSetPlanVideos = async (id: number) => {
    const planVideoDetails = await fetchPlanVideoDetailsById(id);
    const newIDs = planVideoDetails.map((item: any) => item.id);
    const mappedCachedVideos = cachedVideosData.filter(item =>
      newIDs.includes(item.id),
    );
    setMappedVideos(mappedCachedVideos);
  };

  const handleVideoPress = async (vimeoId: number, videoId: number) => {
    const {user_id} = await getCredentials();
    // CTA App Vimeo Bearer token
    const vimeoToken = '91657ec3585779ea01b973f69aae2c9c';
    openVideoModal(vimeoId, vimeoToken, user_id, videoId);
  };

  const VideoItem: React.FC<{item: VideoData}> = React.memo(({item}) => {
    return (
      <View style={styles.videoItemContainer}>
        <View style={styles.wrapper}>
          <Pressable onPress={() => handleVideoPress(item.vimeoid, item.id)}>
            <Image
              source={{uri: item.thumburl}}
              style={styles.lessonThumbnail}
            />
          </Pressable>
          <Text style={styles.lessonTitle}>{item.title}</Text>
        </View>
      </View>
    );
  });

  const CarouselItem: React.FC<{item: VideoData}> = React.memo(({item}) => {
    return (
      <View style={styles.carouselContent}>
        <Pressable
          onPress={() => fetchAndSetPlanVideos(item.id)}
          style={[styles.thumbnailContainer]}>
          <Image source={{uri: item.thumburl}} style={styles.thumbnail} />
          <Text style={styles.titleOverlay}>{item.title}</Text>
        </Pressable>
      </View>
    );
  });

  return (
    <View style={styles.videoItemContainer}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder={`Search ${filteredVideos.length} lesson plans...`}
          placeholderTextColor={'rgba(0, 0, 0, 0.5)'}
          onChangeText={handleSearch}
          value={searchTerm}
        />
      </View>
      {/*<View>*/}
      {/*  <Text style={styles.categoryName}>SWIPE AND CLICK FOR DETAILS</Text>*/}
      {/*</View>*/}
      <FlatList
        horizontal
        data={filteredVideos}
        style={styles.carouselContainer}
        contentContainerStyle={styles.carouselContentContainer}
        showsHorizontalScrollIndicator={true}
        indicatorStyle={'white'}
        keyExtractor={(item, index) => `${index}-${item.id.toString()}`}
        renderItem={({item}) => <CarouselItem item={item} />}
      />
      {mappedVideos.length > 0 && (
        <FlatList
          style={styles.lessonContainer}
          data={mappedVideos}
          renderItem={({item}) => <VideoItem item={item} />}
          keyExtractor={item => item.id.toString()}
          indicatorStyle={'white'}
          showsVerticalScrollIndicator={true}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    height: 40,
    color: '#050505',
    backgroundColor: '#fff',
    marginRight: 8,
    paddingHorizontal: 10,
    width: '100%',
  },
  videoItemContainer: {
    marginBottom: 10,
  },
  title: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 8,
    padding: 10,
  },
  thumbnail: {
    width: 370,
    height: '100%',
  },
  thumbnailContainer: {
    position: 'relative',
  },
  wrapper: {
    flexDirection: 'row',
  },
  icons: {
    textAlign: 'right',
    width: '5%',
    marginTop: 8,
    display: 'flex',
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
  },
  categoryName: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  carouselContainer: {
    backgroundColor: '#000',
    height: 250,
  },
  carouselContentContainer: {
    paddingVertical: 10,
  },
  carouselContent: {
    height: '100%',
    borderRadius: 0,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  titleOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    padding: 8,
    textAlign: 'center',
  },
  iconOverlay: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    left: '50%',
    top: '40%',
  },
  icon: {
    marginBottom: 8,
  },
  instructionOverlay: {
    color: '#fff',
    fontSize: 12,
  },
  shadowProp: {
    shadowColor: '#000',
    shadowOffset: {width: -3, height: 5},
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  lessonContainer: {
    height: 450,
    marginTop: 20,
  },
  lessonTitle: {
    width: '60%',
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 0,
    marginBottom: 10,
    marginLeft: 10,
  },
  lessonThumbnail: {
    width: 100,
    height: 60,
  },
});

export default LessonPlansListing;
