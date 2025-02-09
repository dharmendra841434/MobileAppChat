import {View, Text, Image, Pressable, TouchableOpacity} from 'react-native';
import ProfileIcon from './ProfileIcon';
import CustomText from './CustomText';

const ActiveUserCard = ({user, handleStartConversation}) => {
  return (
    <View
      key={user?._id}
      className="flex flex-row my-2 items-center p-4 space-x-4 shadow-sm w-full max-w-md bg-gray-200 rounded-lg border">
      {/* User Avatar */}
      {/* <Image
        source={{uri: user.profile_pic}}
        className="w-12 h-12 rounded-full"
      /> */}

      <ProfileIcon fullName={user.full_name} />

      {/* User Info */}
      <View className="flex-1 ml-2">
        <CustomText className="text-lg font-semibold capitalize">
          {user.full_name}
        </CustomText>
        <CustomText className="text-sm text-gray-500">
          @{user.username}
        </CustomText>
      </View>

      {/* Action Buttons */}
      <View className="flex-row">
        <TouchableOpacity
          activeOpacity={0.7}
          className="bg-background px-5 py-3 rounded-md mr-3"
          onPress={() => handleStartConversation(user)}>
          <CustomText className="text-white">Start Conversation</CustomText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ActiveUserCard;
