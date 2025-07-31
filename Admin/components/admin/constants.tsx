export const mockApplications = [
  {
    id: 1,
    name: 'Grace Mwangi',
    businessName: 'Mama Grace Catering',
    phone: '+254 721 123 456',
    email: 'grace@mamagrace.co.ke',
    location: 'Kiambu, Kenya',
    businessType: 'Services',
    submittedDate: '2024-02-15',
    status: 'pending',
    priority: 'high',
    documents: {
      nationalId: { status: 'submitted', url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&h=200&fit=crop' },
      businessDocs: { status: 'submitted', url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=300&h=200&fit=crop' },
      businessPhoto: { status: 'submitted', url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop' },
      location: { status: 'verified', coordinates: '-1.2921, 36.8219' }
    },
    fundingRequest: 50000,
    businessDescription: 'Catering services for events and corporate functions. Specializing in traditional Kenyan cuisine.',
    verificationNotes: ''
  },
  {
    id: 2,
    name: 'David Kamau',
    businessName: 'Urban Farm Tech',
    phone: '+254 712 987 654',
    email: 'david@urbanfarm.co.ke',
    location: 'Nairobi, Kenya',
    businessType: 'Agriculture',
    submittedDate: '2024-02-14',
    status: 'pending',
    priority: 'medium',
    documents: {
      nationalId: { status: 'submitted', url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&h=200&fit=crop' },
      businessDocs: { status: 'missing', url: null },
      businessPhoto: { status: 'submitted', url: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=200&fit=crop' },
      location: { status: 'pending', coordinates: null }
    },
    fundingRequest: 75000,
    businessDescription: 'Hydroponic farming solutions for urban environments.',
    verificationNotes: ''
  },
  {
    id: 3,
    name: 'Esther Nyong\'o',
    businessName: 'Fashion Forward Kenya',
    phone: '+254 733 555 777',
    email: 'esther@fashionforward.ke',
    location: 'Mombasa, Kenya',
    businessType: 'Manufacturing',
    submittedDate: '2024-02-13',
    status: 'approved',
    priority: 'low',
    documents: {
      nationalId: { status: 'verified', url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&h=200&fit=crop' },
      businessDocs: { status: 'verified', url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=300&h=200&fit=crop' },
      businessPhoto: { status: 'verified', url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop' },
      location: { status: 'verified', coordinates: '-4.0435, 39.6682' }
    },
    fundingRequest: 40000,
    businessDescription: 'Sustainable fashion and accessories made from recycled materials.',
    verificationNotes: 'Excellent documentation. Strong business plan.'
  }
];