// Bu bir "Interface". Bir objenin şablonudur.
// Proje boyunca nerede "City" kullanırsak bu kurallara uymak zorunda kalacağız.

export interface City {
  id: number;
  name: string;
  plateCode: number; // Plaka kodu sayısal olmalı
  isVisited: boolean; // Gezildi mi?
  visitedDate?: string; // Soru işareti (?) bu alanın "opsiyonel" olduğunu belirtir.
  note?: string; // Her gezilen yere not yazmayabiliriz.
}