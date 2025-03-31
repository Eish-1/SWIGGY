import { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { getRandomFoodImage } from '../utils/helpers';

const FoodItemModal = ({ isOpen, closeModal, item, addToCart }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        // Check if user is logged in
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);

        // Reset quantity when modal opens with new item
        setQuantity(1);
    }, [item]);

    const handleAddToCart = () => {
        addToCart({ ...item, quantity });
        closeModal();
    };

    const incrementQuantity = () => setQuantity(prev => prev + 1);
    const decrementQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

    if (!item) return null;

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-50" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-0 text-left align-middle shadow-xl transition-all">
                                <div className="relative">
                                    <img
                                        src={item.image || item.imageUrl || getRandomFoodImage(item.name)}
                                        alt={item.name}
                                        className="w-full h-64 object-cover"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = getRandomFoodImage(item.name);
                                        }}
                                    />
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="absolute top-2 right-2 rounded-full bg-white p-2 text-gray-500 hover:bg-gray-100"
                                    >
                                        <FontAwesomeIcon icon={faXmark} className="h-5 w-5" aria-hidden="true" />
                                    </button>
                                </div>

                                <div className="p-6">
                                    <Dialog.Title as="h3" className="text-2xl font-bold text-[#282C3F]">
                                        {item.name}
                                    </Dialog.Title>

                                    <div className="mt-2 mb-4">
                                        <p className="text-lg font-semibold text-[#FC8019]">₹{item.price}</p>
                                        <p className="text-gray-600 mt-2">
                                            {item.description || `Delicious ${item.name} prepared with fresh ingredients. Our chefs use the finest ingredients to create this mouth-watering dish that's perfect for any occasion.`}
                                        </p>
                                    </div>

                                    {/* Ingredients or nutritional info could go here */}
                                    <div className="my-4 p-3 bg-gray-50 rounded-lg">
                                        <h4 className="text-sm font-semibold text-gray-700">About this dish</h4>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {item.ingredients ? `Ingredients: ${item.ingredients}` : 'Made with high-quality ingredients. Please inform server of any allergies.'}
                                        </p>
                                    </div>

                                    <div className="mt-6 flex items-center justify-between">
                                        {isLoggedIn ? (
                                            <>
                                                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                                                    <button
                                                        onClick={decrementQuantity}
                                                        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700"
                                                    >
                                                        <FontAwesomeIcon icon={faMinus} size="xs" />
                                                    </button>
                                                    <span className="px-4 py-1">{quantity}</span>
                                                    <button
                                                        onClick={incrementQuantity}
                                                        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700"
                                                    >
                                                        <FontAwesomeIcon icon={faPlus} size="xs" />
                                                    </button>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={handleAddToCart}
                                                    className="rounded-lg bg-[#FC8019] px-6 py-2 text-white hover:bg-[#e07016] transition-colors duration-300"
                                                >
                                                    Add to Cart • ₹{item.price * quantity}
                                                </button>
                                            </>
                                        ) : (
                                            <div className="w-full">
                                                <button
                                                    type="button"
                                                    disabled
                                                    className="w-full rounded-lg bg-gray-300 px-6 py-2 text-gray-600 cursor-not-allowed"
                                                >
                                                    Add to Cart
                                                </button>
                                                <p className="mt-2 text-sm text-gray-500 text-center">
                                                    Please <Link to="/login" className="text-[#FC8019] hover:underline">login</Link> to add items to cart
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default FoodItemModal; 