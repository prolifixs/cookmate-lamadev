import Image from 'next/image';

interface FoodImageProps {
  imageUrl: string;
  title: string;
}

export const FoodImageComponent = ({ imageUrl, title }: FoodImageProps) => {
  return (
    <div className="w-[200px] h-[150px] relative bg-gray-100 rounded-lg">
      <Image
        src={imageUrl}
        alt={title}
        fill
        className="object-cover rounded-lg"
      />
    </div>
  );
}; 