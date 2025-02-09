import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import CustomText from './CustomText';

const PendingUserCard = ({
  user,
  handleAcceptRequest,
  handleCancelRequest,
  cancelLoading,
  accpetLoading,
}) => {
  return (
    <View
      key={user?._id}
      className="flex flex-row items-center p-4 space-x-4 shadow-sm w-full max-w-md bg-white rounded-lg border">
      {/* User Avatar */}
      <Image
        source={{uri: user.profile_pic}}
        className="w-12 h-12 rounded-full"
      />

      {/* User Info */}
      <View className="flex-1">
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
          className="bg-green-700 px-3 py-1 rounded-md mr-3"
          onPress={() => handleAcceptRequest(user._id)}>
          {accpetLoading ? (
            <ActivityIndicator />
          ) : (
            <CustomText className="text-white">Accept</CustomText>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          className="bg-red-600 px-3 py-1 rounded-md"
          onPress={() => handleCancelRequest(user._id)}>
          {cancelLoading ? (
            <ActivityIndicator />
          ) : (
            <CustomText className="text-white">Reject</CustomText>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PendingUserCard;
