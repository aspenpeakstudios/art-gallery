import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function seed() {
  const user1 = await prisma.user.create({
    data: {
      username: "Kathy",
      role: "OWNER",
      // this is a hashed version of "twixrox"
      passwordHash:
        "$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u"
    }
  });

  const user2 = await prisma.user.create({
    data: {
      username: "John",
      role: "WEBMASTER",
      // this is a hashed version of "twixrox"
      passwordHash:
        "$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u"
    }
  });

  await Promise.all(
    getGalleryItems().map(item => {
      const data = { name: item.name, description: item.description, availability: item.availability, isActive: item.isActive, tags: item.tags, coverImageUrl: item.coverImageUrl }
      return prisma.galleryItem.create({ data });
    })
  );
}

seed();

function getGalleryItems() {
  
  return [
    {
      name: "SwiftCreek",
      description: "Photo of SwiftCreek run at Whitefish Mountain",
      availability: "For Sale",
      isActive: true,
      tags: "Photo, Ski",    
      coverImageUrl: "https://res.cloudinary.com/drvcbv6ec/image/upload/v1643161405/gallery-items/swiftcreek_aks92w.jpg"  
    },
    {
      name: "Light in the Valley",
      description: "Photo of sun rays illuminating Whitefish valley",
      availability: "Sold",
      isActive: true,
      tags: "Photo, Whitefish",    
      coverImageUrl: "https://res.cloudinary.com/drvcbv6ec/image/upload/v1643161406/gallery-items/lightrun_zltc8o.jpg"  
    },
    {
      name: "Mansion",
      description: "Photo of mansion with amazing water feature.",
      availability: "For Sale",
      isActive: true,
      tags: "Photo, Whitefish",    
      coverImageUrl: "https://res.cloudinary.com/drvcbv6ec/image/upload/v1643161406/gallery-items/mansion_h9rmar.jpg"  
    },
    {
      name: "Jewel Basin in a Storm",
      description: "Photo from top of mountain in Jewel Basin in late November",
      availability: "Not for Sale",
      isActive: true,
      tags: "Photo, Hiking",    
      coverImageUrl: "https://res.cloudinary.com/drvcbv6ec/image/upload/v1643161405/gallery-items/jewelbasin_caymkj.jpg"  
    },
    {
      name: "Badlands at sunset",
      description: "Photo taken shortly before sunset in Badlands National Park",
      availability: "Not for Sale",
      isActive: true,
      tags: "Photo, Badlands",    
      coverImageUrl: "https://res.cloudinary.com/drvcbv6ec/image/upload/v1643161405/gallery-items/badlands_ep0dgd.jpg"  
    },
    {
      name: "Ed and Mullys",
      description: "Photo taken by Ed and Mullys at Whitefish Mountain Resort",
      availability: "Not for Sale",
      isActive: false,
      tags: "Photo,  Whitefish",    
      coverImageUrl: "https://res.cloudinary.com/drvcbv6ec/image/upload/v1643161404/gallery-items/edandmullys_zxwnx3.jpg"  
    },
    {
      name: "Glacier Boat Ramp",
      description: "Photo taken by the boat ramp at Glacier National Park",
      availability: "For Sale",
      isActive: true,
      tags: "Photo, Glacier",    
      coverImageUrl: "https://res.cloudinary.com/drvcbv6ec/image/upload/v1643161404/gallery-items/ramp_ftfitb.jpg"  
    },
    {
      name: "Sheep at Dusk",
      description: "Photo taken of Bighorn Sheep in the Badlands National Park",
      availability: "For Sale",
      isActive: true,
      tags: "Photo,  Badlands",    
      coverImageUrl: "https://res.cloudinary.com/drvcbv6ec/image/upload/v1643161405/gallery-items/sheep_wqnbzp.jpg"  
    }
  ];
}