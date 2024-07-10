import User from '@/models/userModel';
import { IUser } from '@/models/userModelTypes';

const fetchUserData = async (userId: string): Promise<IUser | null> => {
    try {
        const user = await User.findById(userId);
        return user;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export default fetchUserData;