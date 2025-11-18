import {create} from 'zustand'
import {persist, createJSONStorage} from 'zustand/middleware'
export const useUserStore = create()(
    persist (
        (set,get) => ({
            session: undefined,
            setSession: (session) => set({...session}),
        }),
        {
            name:'user-storage',
            storage: createJSONStorage(()=> localStorage),
        },
    ),
)