import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import useStore from '@/store';
import Cookies from 'js-cookie';

interface DropdownOption {
    id: number;
    project: string;
}


const DropdownFilter = () => {
    const access_token = Cookies.get('token')
    const { id, setId, isOpen, setIsOpen, fetchProject, projectData, selectedFilters, setSelectedFilters } = useStore();

    const toggleFilter = (option: DropdownOption) => {
        const { id: optionId, project } = option;
        const index = id.indexOf(optionId);

        if (index === -1) {
            setId([...id, optionId]);
            setSelectedFilters([...selectedFilters, project]);
        } else {
            const newId = [...id];
            newId.splice(index, 1);
            setId(newId);
            const newFilters = [...selectedFilters];
            newFilters.splice(index, 1);
            setSelectedFilters(newFilters);
        }
    };

    const handleSelectClick = () => {
        setIsOpen(!isOpen);
    };

    const handleRemoveFilter = (value: string) => {
        const index = selectedFilters.indexOf(value);
        if (index !== -1) {
            const newId = [...id];
            newId.splice(index, 1);
            setId(newId);
            const newFilters = [...selectedFilters];
            newFilters.splice(index, 1);
            setSelectedFilters(newFilters);
        }
    };

    useEffect(() => {
        fetchProject(access_token)
    }, [])


    return (
        <div className="relative inline-block text-left">
            <div className="flex">
                <div className="relative w-full">
                    <span className="rounded-md shadow-sm">
                        <button
                            type="button"
                            className="inline-flex justify-center flex-wrap gap-3 w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            id="options-menu"
                            aria-haspopup="true"
                            aria-expanded={isOpen}
                            onClick={handleSelectClick}
                        >
                            {selectedFilters.length > 0 ? (
                                selectedFilters.map((filter, index) => (
                                    <span key={index} className=" bg-gray-200 gap-2 rounded-xl px-2 py-1 mr-1 flex items-center">
                                        <span className="ml-1 w-4 h-4 rounded-full bg-gray-400 flex items-center justify-center" onClick={() => handleRemoveFilter(filter)}>
                                            <X size={10} className='text-gray-200' />
                                        </span>
                                        {filter}
                                    </span>
                                ))
                            ) : (
                                <span className="placeholder">Select</span>
                            )}
                        </button>
                    </span>
                </div>
            </div>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    <div className="py-1" role="none">
                        {projectData.map((option, index) => (
                            <div key={index} className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" role="menuitem" onClick={() => toggleFilter(option)}>
                                <span>{option.project}</span>
                                <input
                                    type="checkbox"
                                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                                    checked={selectedFilters.includes(option.project)}
                                    onChange={() => { }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DropdownFilter;
