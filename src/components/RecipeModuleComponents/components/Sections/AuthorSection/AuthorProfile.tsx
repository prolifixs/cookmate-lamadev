import Image from 'next/image';
import { AuthorProfile } from '../../../types/author.types';

interface AuthorProfileProps {
  profile: AuthorProfile;
}

export const AuthorProfileComponent = ({ profile }: AuthorProfileProps) => {
  return (
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-gray-200">
        {profile.avatar && (
          <Image
            src={profile.avatar}
            alt={profile.name}
            width={48}
            height={48}
            className="rounded-full object-cover"
          />
        )}
      </div>
      <div>
        <h3 className="font-semibold">{profile.name}</h3>
        <p className="text-sm text-gray-600">{profile.title}</p>
      </div>
    </div>
  );
};
