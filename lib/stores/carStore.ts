import { create } from 'zustand';
import { Car } from '@/types/car';

export interface FilterState {
  brand: string;
  rentalPrice: string;
  minMileage: string;
  maxMileage: string;
}

const initialFilters: FilterState = {
  brand: '',
  rentalPrice: '',
  minMileage: '',
  maxMileage: '',
};

interface CarStore {
  formFilters: FilterState;
  appliedFilters: FilterState;
  favorites: Car[];

  setFormFilter: (name: keyof FilterState, value: string) => void;
  setAppliedFilters: () => void;
  resetFilters: () => void;
  toggleFavorite: (car: Car) => void;
}

export const useCarStore = create<CarStore>()((set, get) => ({
  formFilters: initialFilters,
  appliedFilters: initialFilters,
  favorites: [],

  setFormFilter: (name, value) =>
    set(state => {
      // Якщо значення не змінюється — НЕ оновлюємо стейт
      if (state.formFilters[name] === value) return state;

      return {
        formFilters: {
          ...state.formFilters,
          [name]: value,
        },
      };
    }),

  setAppliedFilters: () =>
    set(state => ({
      appliedFilters: { ...state.formFilters },
    })),

  resetFilters: () =>
    set(() => ({
      formFilters: initialFilters,
      appliedFilters: initialFilters,
    })),

  toggleFavorite: (car: Car) =>
    set(state => {
      const isFavorite = state.favorites.some(fav => fav.id === car.id);
      return {
        favorites: isFavorite
          ? state.favorites.filter(fav => fav.id !== car.id)
          : [...state.favorites, car],
      };
    }),
}));
