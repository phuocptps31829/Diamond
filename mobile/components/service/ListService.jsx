import { Text, FlatList, TouchableOpacity, Image } from "react-native";

const packages = [
  {
    id: 1,
    image: "https://ykhoadiamond.com/images/thumbs/goikham-dich-vu.jpg",
    name: "Điện tim thường",
  },
  {
    id: 2,
    image: "https://ykhoadiamond.com/images/thumbs/goikham-dich-vu.jpg",
    name: "Điện tim thường",
  },
  {
    id: 3,
    image: "https://ykhoadiamond.com/images/thumbs/goikham-dich-vu.jpg",
    name: "Điện tim thường",
  },
  {
    id: 4,
    image: "https://ykhoadiamond.com/images/thumbs/goikham-dich-vu.jpg",
    name: "Điện tim thường",
  },
  {
    id: 5,
    image: "https://ykhoadiamond.com/images/thumbs/goikham-dich-vu.jpg",
    name: "Điện tim thường",
  },
  {
    id: 6,
    image: "https://ykhoadiamond.com/images/thumbs/goikham-dich-vu.jpg",
    name: "Điện tim thường",
  },
  {
    id: 7,
    image: "https://ykhoadiamond.com/images/thumbs/goikham-dich-vu.jpg",
    name: "Điện tim thường",
  },
];

const ListService = () => {
  return (
    <>
      <FlatList
        data={packages}
        className="w-full mt-2"
        contentContainerStyle={{ paddingHorizontal: 10 }}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            key={index}
            className="flex-column max-w-[170px] relative bg-white flex-1 m-1 rounded-[10px] overflow-hidden"
            onPress={() => {
              console.log("Button pressed!");
            }}
          >
            <Image
              source={{
                uri: item.image,
              }}
              className="h-[110px]"
            />
            <Text
              className="text-black font-semibold p-2"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
        numColumns={2}
      />
    </>
  );
};

export default ListService;
