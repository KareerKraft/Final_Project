import React, { useState, useRef, useEffect } from 'react'
import { ChevronDown, Plus } from 'lucide-react'

const SearchableMultiSelect = ({ label, options, selected, onChange, color = 'blue' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef(null);
    const inputRef = useRef(null);

    const allOptions = Array.from(new Set([...options, ...selected]));
    const filtered = allOptions.filter(opt => 
        opt.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Check if searchTerm is a new custom item (not in options and not already selected)
    const isCustomItem = searchTerm.trim() && !options.includes(searchTerm.trim()) && !selected.includes(searchTerm.trim());

    const handleToggle = (option) => {
        if (selected.includes(option)) {
            onChange(selected.filter(item => item !== option));
        } else {
            onChange([...selected, option]);
        }
    };

    const handleAddCustom = () => {
        if (searchTerm.trim() && !selected.includes(searchTerm.trim())) {
            onChange([...selected, searchTerm.trim()]);
            setSearchTerm('');
        }
    };

    const handleRemove = (option, e) => {
        e.stopPropagation();
        onChange(selected.filter(item => item !== option));
    };

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsOpen(false);
                setSearchTerm('');
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const colorMap = {
        blue: { tag: 'bg-green-100 text-green-700', border: 'border-green-300 hover:border-green-500 focus:ring-green-500', option: 'hover:bg-green-50' },
        green: { tag: 'bg-green-100 text-green-700', border: 'border-green-300 hover:border-green-500 focus:ring-green-500', option: 'hover:bg-green-50' },
    };

    const colors = colorMap[color] || colorMap.blue;

    return (
        <div className="w-full" ref={dropdownRef}>
            {label && <label className="block text-sm md:text-base font-medium text-gray-700 mb-2">{label}</label>}
            
            <div className={`relative border-2 rounded-lg bg-white transition-all duration-200 ${colors.border}`}>
                <div 
                    className="flex items-center gap-2 p-3 cursor-pointer min-h-12 md:min-h-14"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {!isOpen && selected.length === 0 && (
                        <span className="text-gray-400 text-sm md:text-base">Click to select...</span>
                    )}
                    {isOpen && (
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Search here"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="flex-1 outline-none bg-transparent text-sm md:text-base placeholder-gray-400"
                        />
                    )}
                    <ChevronDown size={20} className={`transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
                </div>

                {/* Selected Tags */}
                {selected.length > 0 && !isOpen && (
                    <div className="flex flex-wrap gap-2 px-3 pb-3">
                        {selected.map(item => (
                            <span key={item} className={`${colors.tag} px-3 py-1 rounded-full text-xs md:text-sm flex items-center gap-2`}>
                                {item}
                                <button 
                                    type="button" 
                                    onClick={(e) => handleRemove(item, e)}
                                    className="font-bold hover:opacity-70"
                                >
                                    ×
                                </button>
                            </span>
                        ))}
                    </div>
                )}

                {/* Dropdown Menu */}
                {isOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 border-2 border-gray-200 rounded-lg bg-white shadow-lg z-50 max-h-64 overflow-y-auto">
                        {filtered.length > 0 ? (
                            filtered.map(option => (
                                <div
                                    key={option}
                                    onClick={() => handleToggle(option)}
                                    className={`px-4 py-2 md:py-3 cursor-pointer flex items-center gap-2 text-sm md:text-base ${colors.option} ${
                                        selected.includes(option) ? 'bg-opacity-50 font-semibold' : ''
                                    }`}
                                >
                                    <input
                                        type="checkbox"
                                        checked={selected.includes(option)}
                                        readOnly
                                        className="w-4 h-4 md:w-5 md:h-5 cursor-pointer accent-green-500"
                                    />
                                    {option}
                                </div>
                            ))
                        ) : (
                            <div className="px-4 py-3 text-gray-500 text-sm text-center">No options found</div>
                        )}

                        {/* Add Custom Item Option */}
                        {isCustomItem && (
                            <div
                                onClick={handleAddCustom}
                                className={`px-4 py-2 md:py-3 cursor-pointer flex items-center gap-2 text-sm md:text-base font-semibold border-t-2 border-gray-200 ${colors.option}`}
                            >
                                <Plus size={18} />
                                Add "{searchTerm.trim()}"
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchableMultiSelect;
