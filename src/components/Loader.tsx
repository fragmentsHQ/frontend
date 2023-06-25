import React, { useContext } from 'react'
import { Loader } from '@heathmont/moon-core-tw';
import { AuthContext } from '../app/providers/AuthProvider'
import Modal from "./Modal";
type Props = {}

const AppLoader = (props: Props) => {
    const { isLoading, setIsLoading } = useContext(AuthContext);
    return (
        <Modal
            open={!isLoading.loading}
            onClose={() => setIsLoading(false)}
        >
            <div>
                <Loader />
                {isLoading.instructions && <p className="text-white text-center">{isLoading.instructions}</p>}
                {
                    isLoading.message && <p className="text-white text-center">{isLoading.message}</p>
                }


            </div>

        </Modal>
    )
}

export default AppLoader