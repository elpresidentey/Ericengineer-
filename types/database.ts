export interface Service {
  id: number;
  title: string;
  description: string;
  icon?: string;
  created_at?: string;
}

export interface InverterPackage {
  id: number;
  name: string;
  battery: string;
  without_solar: string;
  with_solar: string;
  featured: boolean;
  created_at?: string;
}

export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  year: string;
  created_at?: string;
}

export interface Testimonial {
  id: number;
  name: string;
  position: string;
  message: string;
  created_at?: string;
}
