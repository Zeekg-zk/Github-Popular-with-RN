import { View, FlatList } from "react-native";
import { Text } from "@rneui/themed";
import React from "react";
import { useFetchPopularRepos } from "../../api/hotHome";

import HotScrollViewItem from "../../components/HotScrollViewItem";

interface IProps {
  value: string;
}

const ScrollView: React.FC<IProps> = (props) => {
  const { repoData, isLoading, refetchPopularRepos, error } =
    useFetchPopularRepos(props.value);
  const [refresh, setRefresh] = React.useState(false);

  if (isLoading) {
    return (
      <View>
        <Text h3>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text>加载失败</Text>
      </View>
    );
  }
  // 刷新
  const refreshList = async () => {
    setRefresh(true);
    refetchPopularRepos(() => setRefresh(false));
  };

  return (
    <View>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={repoData!.items}
        refreshing={refresh}
        renderItem={({ item }) => (
          <HotScrollViewItem
            collectionStatus={"collection"}
            key={item.id}
            {...item}
          />
        )}
        onRefresh={refreshList}
      />
    </View>
  );
};

export default ScrollView;
