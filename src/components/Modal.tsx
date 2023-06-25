/* This example requires Tailwind CSS v2.0+ */
import { Dialog, Transition } from "@headlessui/react";
const XIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>

)
// import { CgCloseR } from "react-icons/cg";
import { Fragment } from "react"

interface IModal {
    readonly open: boolean;
    readonly onClose: () => void;
    readonly title?: string;
    readonly onOk?: () => void;
    readonly okText?: string;
    readonly width?: string;
    readonly disabled?: boolean;
    readonly loading?: boolean;
    readonly showCTA?: boolean;
    readonly showClose?: boolean;
    children: React.ReactNode;
}

const Modal: React.FC<IModal> = ({
    open,
    onClose,
    title,
    children,
    showClose = true
}) => {
    return (
        // <Transition.Root show={open} >
        //     <Dialog
        //         as="div"
        //         className="fixed z-[100] inset-0  "
        //         onClose={() => { }}
        //     >
        //         <div className="flex items-center min-h-screen justify-center pt-4 px-4 pb-20 text-center sm:block sm:p-0 text-white    font-normal  ">
        //             <Transition.Child
        //                 // as={Fragment}
        //                 enter="ease-out duration-300"
        //                 enterFrom="opacity-0"
        //                 enterTo="opacity-100"
        //                 leave="ease-in duration-200"
        //                 leaveFrom="opacity-100"
        //                 leaveTo="opacity-0"
        //             >
        //                 <Dialog.Overlay className="fixed inset-0  bg-opacity-70 transition-opacity" />
        //             </Transition.Child>

        //             <Transition.Child
        //                 // as={Fragment}
        //                 enter="ease-out duration-300"
        //                 enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        //                 enterTo="opacity-100 translate-y-0 sm:scale-100"
        //                 leave="ease-in duration-200"
        //                 leaveFrom="opacity-100 translate-y-0 sm:scale-100"
        //                 leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        //             >
        //                 <div className="fixed inset-0 opacity-60 bg-black/30" aria-hidden="true" />
        //                 <Dialog.Panel
        //                     className={`inline-block align-bottom bg-[#232529] py-4 overflow-hidden rounded-lg text-left shadow-xl transform transition-all sm:my-8 sm:align-middle max-w-lg w-full `}
        //                 >

        //                     <div className="px-8">

        //                         <div className="">{children}</div>

        //                     </div>
        //                 </Dialog.Panel>
        //             </Transition.Child>
        //         </div>
        //     </Dialog>
        // </Transition.Root>
        <Transition appear show={open} as="div">
            <Dialog as="div" className="relative z-10" onClose={onClose}>
                <Transition.Child
                    as="div"
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as="div"
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                    
                            <Dialog.Panel className="w-full max-w-md transform rounded-2xl bg-[#282828] p-6 text-left align-middle shadow-xl transition-all">
                                {children}
                  
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>

    );
};

export default Modal;
