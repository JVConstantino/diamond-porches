import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

// Define the shape of the context
interface LanguageContextType {
  language: string;
  setLanguage: (language: string) => void;
  t: (key: string, options?: { [key: string]: string | number }) => string;
}

// All translation strings are stored here
const translations: { [key: string]: { [key: string]: string } } = {
  en: {
    // Header & Footer Nav
    "nav.estimator": "Estimator",
    "nav.services": "Services",
    "nav.projects": "Projects",
    "nav.gallery": "Gallery",
    "nav.reviews": "Reviews",
    "nav.get_estimate": "Get Free Estimate",
    "nav.admin": "Admin Panel",

    // Hero
    "hero.title": "Your Dream Project, <span class=\"text-brand-gold\">Instantly</span> Priced.",
    "hero.subtitle": "Stop waiting for callbacks. Use our free tool to get an instant, transparent price estimate for your new deck, pool fence, or gutter guards.",
    "hero.cta": "Start My Free Estimate",

    // Simulator
    "simulator.title": "Get an Estimate in 60 Seconds",
    "simulator.subtitle": "Follow these simple steps to get a real-time price estimate for your project.",
    "simulator.step1_title": "1. Your Contact Information",
    "simulator.step2_title": "2. Select Your Project Type",
    "simulator.step3_title": "3. Enter Dimensions for Your {projectType}",
    "simulator.step4_title": "4. Choose Your Material",
    "simulator.step5_title": "5. Your Estimated Quote",
    "simulator.label_name": "Full Name",
    "simulator.label_phone": "Phone Number",
    "simulator.label_city": "City",
    "simulator.label_neighborhood": "Neighborhood / Area",
    "simulator.placeholder_name": "e.g., John Doe",
    "simulator.placeholder_phone": "(555) 123-4567",
    "simulator.placeholder_city": "e.g., Austin",
    "simulator.placeholder_neighborhood": "e.g., South Congress",
    "simulator.button_next_project": "Next: Select Project",
    "simulator.button_next_material": "Next: Choose Material",
    "simulator.button_back": "Back",
    "simulator.label_width": "Width (feet)",
    "simulator.label_length": "Length (feet)",
    "simulator.quote_title": "Project Cost Estimate",
    "simulator.quote_date": "Date",
    "simulator.quote_prepared_for": "Prepared for:",
    "simulator.quote_estimated_cost": "Estimated Cost:",
    "simulator.quote_summary": "Project Summary:",
    "simulator.quote_item": "Item",
    "simulator.quote_details": "Details",
    "simulator.quote_project_type": "Project Type",
    "simulator.quote_dimensions": "Dimensions",
    "simulator.quote_material": "Material",
    "simulator.quote_disclaimer": "*This is a preliminary estimate. Final cost may vary based on site conditions, specific features, and local regulations.",
    "simulator.button_start_over": "Start Over",
    "simulator.button_print": "Print / Save PDF",
    "simulator.button_whatsapp": "Finalize on WhatsApp",
    
    // Trust Badges
    "trust.title": "Fully Licensed, Insured & Proudly Certified",
    "trust.warranty": "5-Year Workmanship Warranty",

    // Services
    "services.title": "Comprehensive Exterior Solutions",
    "services.subtitle": "From stunning screened porches to durable siding, we offer a wide range of services to enhance your home.",
    "services.screenedPorch.title": "Screened Porch & Gutter Services",
    "services.otherExterior.title": "Siding, Fences & Finishes",

    // Case Studies
    "casestudies.title": "Our Featured Projects",
    "casestudies.subtitle": "Explore our portfolio of successful projects and see the quality craftsmanship we deliver.",
    "casestudies.view_project": "View Project",

    // Gallery
    "gallery.title": "Quality You Can See",
    "gallery.subtitle": "Browse our gallery of recently completed projects and find inspiration for your own home.",
    "gallery.filter_all": "All Projects",

    // Testimonials
    "testimonials.title": "Trusted by Homeowners Like You",
    "testimonials.subtitle": "Don't just take our word for it. Here's what our satisfied customers have to say.",
    
    // YouTube
    "youtube.title": "See Our Work in Action",
    "youtube.subtitle": "Watch our team bring projects to life, from initial design to final walkthrough.",

    // Footer
    "footer.tagline": "Building quality outdoor spaces with transparent pricing and unmatched craftsmanship.",
    "footer.services_title": "Services",
    "footer.links_title": "Quick Links",
    "footer.contact_title": "Contact Us",
    "footer.contact_location": "Serving the greater USA",
    "footer.copyright": "© {year} DIAMOND Home Improvement. All rights reserved.",

    // Case Study Detail Page
    "casedetail.breadcrumb_home": "Home",
    "casedetail.breadcrumb_projects": "Projects",
    "casedetail.not_found_title": "Project Not Found",
    "casedetail.not_found_subtitle": "The project you are looking for does not exist or has been moved.",
    "casedetail.not_found_cta": "Back to Projects",
    "casedetail.details_title": "Project Details",
    "casedetail.details_type": "Type:",
    "casedetail.details_size": "Size:",
    "casedetail.description_title": "Description",
    "casedetail.cta": "Estimate a Similar Project",

    // Dynamic Content Keys (from constants)
    "deck": "Decks & Patios",
    "pool_fence": "Pool Fences",
    "gutters": "Gutter Guards",
    "wood": "Pressure-Treated Wood",
    "composite": "Composite",
    "pvc": "PVC Decking",
    "mesh": "Removable Mesh",
    "glass": "Glass Panel",
    "aluminum": "Aluminum",
    "screen": "Metal Screen",
    "micro_mesh": "Micro-Mesh",
    "foam": "Foam Insert",

    "service.ScreenPorchIcon.name": "Motorized & Regular Porches",
    "service.ScreenPorchIcon.description": "Custom screen solutions to enjoy the outdoors bug-free, perfectly matching your home and lifestyle.",
    "service.WrenchScrewdriverIcon.name": "Screen Repair & Replacement",
    "service.WrenchScrewdriverIcon.description": "From minor tear repairs to full screen replacement with high-quality mesh to renew your porch.",
    "service.ShieldCheckIcon.name": "Specialty Pet Screens",
    "service.ShieldCheckIcon.description": "Durable, scratch-resistant mesh designed to keep your pets safe, secure, and contained.",
    "service.BeakerIcon.name": "Gutter Guard Installation",
    "service.BeakerIcon.description": "Durable, clog-resistant protectors that fit seamlessly onto your existing gutters to prevent debris.",
    "service.SidingIcon.name": "Vinyl Siding Replacement",
    "service.SidingIcon.description": "Replace cracked, faded, or damaged siding to restore your home’s beauty and protection.",
    "service.ShutterIcon.name": "Shutter Services",
    "service.ShutterIcon.description": "Professional installation, repair, and replacement to enhance your home’s curb appeal.",
    "service.FenceIcon.name": "Fencing & Privacy Panels",
    "service.FenceIcon.description": "Sturdy fences for privacy and security, including property dividers and decorative panels.",
    "service.CubeIcon.name": "Exterior Fixture Mounting",
    "service.CubeIcon.description": "Secure mounting for lights and outlets with professional box and J-block replacement.",

    "gallery.alt.1": "Modern composite deck",
    "gallery.alt.2": "Sleek glass pool fence",
    "gallery.alt.3": "Gutter guard installation",
    "gallery.alt.4": "Spacious wooden patio",
    "gallery.alt.5": "Secure mesh pool fence",
    "gallery.alt.6": "Deck with integrated lighting",
    "gallery.alt.7": "Close-up of micro-mesh gutter",
    "gallery.alt.8": "Elegant aluminum pool fencing",

    "caseStudy.cs1.title": "Modern Backyard Oasis",
    "caseStudy.cs1.location": "Austin, TX",
    "caseStudy.cs1.description": "A complete transformation of a suburban backyard into a modern oasis. We constructed a 500 sq ft multi-level composite deck with integrated lighting, perfect for entertaining. The project also included a sleek aluminum and glass pool fence for safety and style, ensuring an unobstructed view of the pool. The client wanted a low-maintenance, high-impact space for family gatherings.",
    "caseStudy.cs2.title": "South Carolina Country House",
    "caseStudy.cs2.location": "Charleston, SC",
    "caseStudy.cs2.description": "This project involved installing seamless gutter guards on a large country house to protect against heavy seasonal rainfall and pine needle blockage. We used our premium micro-mesh system to ensure long-lasting, clog-free performance. The client is now free from the dangerous task of climbing ladders to clean gutters.",
  },
  es: {
    "nav.estimator": "Estimador",
    "nav.services": "Servicios",
    "nav.projects": "Proyectos",
    "nav.gallery": "Galería",
    "nav.reviews": "Reseñas",
    "nav.get_estimate": "Obtener Presupuesto Gratis",
    "nav.admin": "Panel de Admin",
    "hero.title": "El Proyecto de Tus Sueños, con Precio al <span class=\"text-brand-gold\">Instante</span>.",
    "hero.subtitle": "Deja de esperar llamadas. Usa nuestra herramienta gratuita para obtener un presupuesto instantáneo y transparente para tu nueva terraza, cerca de piscina o protectores de canaletas.",
    "hero.cta": "Comenzar Mi Presupuesto Gratis",
    "simulator.title": "Obtén un Presupuesto en 60 Segundos",
    "simulator.subtitle": "Sigue estos sencillos pasos para obtener un presupuesto en tiempo real para tu proyecto.",
    "simulator.step1_title": "1. Tu Información de Contacto",
    "simulator.step2_title": "2. Selecciona tu Tipo de Proyecto",
    "simulator.step3_title": "3. Ingresa las Dimensiones para tu {projectType}",
    "simulator.step4_title": "4. Elige tu Material",
    "simulator.step5_title": "5. Tu Presupuesto Estimado",
    "simulator.label_name": "Nombre Completo",
    "simulator.label_phone": "Número de Teléfono",
    "simulator.label_city": "Ciudad",
    "simulator.label_neighborhood": "Barrio / Área",
    "simulator.placeholder_name": "Ej: Juan Pérez",
    "simulator.placeholder_phone": "(555) 123-4567",
    "simulator.placeholder_city": "Ej: Miami",
    "simulator.placeholder_neighborhood": "Ej: South Beach",
    "simulator.button_next_project": "Siguiente: Seleccionar Proyecto",
    "simulator.button_next_material": "Siguiente: Elegir Material",
    "simulator.button_back": "Atrás",
    "simulator.label_width": "Ancho (pies)",
    "simulator.label_length": "Largo (pies)",
    "simulator.quote_title": "Estimación de Costo del Proyecto",
    "simulator.quote_date": "Fecha",
    "simulator.quote_prepared_for": "Preparado para:",
    "simulator.quote_estimated_cost": "Costo Estimado:",
    "simulator.quote_summary": "Resumen del Proyecto:",
    "simulator.quote_item": "Ítem",
    "simulator.quote_details": "Detalles",
    "simulator.quote_project_type": "Tipo de Proyecto",
    "simulator.quote_dimensions": "Dimensiones",
    "simulator.quote_material": "Material",
    "simulator.quote_disclaimer": "*Esta es una estimación preliminar. El costo final puede variar según las condiciones del sitio, características específicas y regulaciones locales.",
    "simulator.button_start_over": "Empezar de Nuevo",
    "simulator.button_print": "Imprimir / Guardar PDF",
    "simulator.button_whatsapp": "Finalizar por WhatsApp",
    "trust.title": "Con Licencia, Asegurados y Orgullosamente Certificados",
    "trust.warranty": "Garantía de Mano de Obra de 5 Años",
    "services.title": "Soluciones Exteriores Integrales",
    "services.subtitle": "Desde impresionantes porches con mosquitero hasta revestimientos duraderos, ofrecemos una amplia gama de servicios para mejorar tu hogar.",
    "services.screenedPorch.title": "Servicios de Porches y Canaletas",
    "services.otherExterior.title": "Revestimientos, Cercas y Acabados",
    "casestudies.title": "Nuestros Proyectos Destacados",
    "casestudies.subtitle": "Explora nuestro portafolio de proyectos exitosos y ve la calidad artesanal que ofrecemos.",
    "casestudies.view_project": "Ver Proyecto",
    "gallery.title": "Calidad que Puedes Ver",
    "gallery.subtitle": "Navega por nuestra galería de proyectos recién completados y encuentra inspiración para tu propio hogar.",
    "gallery.filter_all": "Todos los Proyectos",
    "testimonials.title": "Con la Confianza de Propietarios Como Tú",
    "testimonials.subtitle": "No te fíes solo de nuestra palabra. Esto es lo que nuestros clientes satisfechos tienen que decir.",
    "youtube.title": "Ve Nuestro Trabajo en Acción",
    "youtube.subtitle": "Mira a nuestro equipo dar vida a los proyectos, desde el diseño inicial hasta el recorrido final.",
    "footer.tagline": "Construyendo espacios exteriores de calidad con precios transparentes y una artesanía inigualable.",
    "footer.services_title": "Servicios",
    "footer.links_title": "Enlaces Rápidos",
    "footer.contact_title": "Contáctanos",
    "footer.contact_location": "Sirviendo a todo EE. UU.",
    "footer.copyright": "© {year} DIAMOND Home Improvement. Todos los derechos reservados.",
    "casedetail.breadcrumb_home": "Inicio",
    "casedetail.breadcrumb_projects": "Proyectos",
    "casedetail.not_found_title": "Proyecto No Encontrado",
    "casedetail.not_found_subtitle": "El proyecto que buscas no existe o ha sido movido.",
    "casedetail.not_found_cta": "Volver a Proyectos",
    "casedetail.details_title": "Detalles del Proyecto",
    "casedetail.details_type": "Tipo:",
    "casedetail.details_size": "Tamaño:",
    "casedetail.description_title": "Descripción",
    "casedetail.cta": "Estimar un Proyecto Similar",
    "deck": "Terrazas y Patios",
    "pool_fence": "Cercas para Piscinas",
    "gutters": "Protectores de Canaletas",
    "wood": "Madera Tratada a Presión",
    "composite": "Compuesto",
    "pvc": "Deck de PVC",
    "mesh": "Malla Removible",
    "glass": "Panel de Vidrio",
    "aluminum": "Aluminio",
    "screen": "Malla Metálica",
    "micro_mesh": "Micro-Malla",
    "foam": "Inserto de Espuma",
    "service.ScreenPorchIcon.name": "Porches Motorizados y Regulares",
    "service.ScreenPorchIcon.description": "Soluciones de mosquiteros personalizadas para disfrutar del aire libre sin insectos, combinando perfectamente con tu hogar y estilo de vida.",
    "service.WrenchScrewdriverIcon.name": "Reparación y Reemplazo de Mallas",
    "service.WrenchScrewdriverIcon.description": "Desde reparaciones de pequeños desgarros hasta el reemplazo completo de mallas con material de alta calidad para renovar tu porche.",
    "service.ShieldCheckIcon.name": "Mallas Especiales para Mascotas",
    "service.ShieldCheckIcon.description": "Malla duradera y resistente a los arañazos diseñada para mantener a tus mascotas seguras y contenidas.",
    "service.BeakerIcon.name": "Instalación de Protectores de Canaletas",
    "service.BeakerIcon.description": "Protectores duraderos y resistentes a obstrucciones que se ajustan perfectamente a tus canaletas existentes para prevenir escombros.",
    "service.SidingIcon.name": "Reemplazo de Revestimiento de Vinilo",
    "service.SidingIcon.description": "Reemplaza el revestimiento agrietado, descolorido o dañado para restaurar la belleza y protección de tu hogar.",
    "service.ShutterIcon.name": "Servicios de Contraventanas",
    "service.ShutterIcon.description": "Instalación, reparación y reemplazo profesional para mejorar el atractivo exterior de tu hogar.",
    "service.FenceIcon.name": "Cercas y Paneles de Privacidad",
    "service.FenceIcon.description": "Cercas resistentes para privacidad y seguridad, incluyendo divisiones de propiedad y paneles decorativos.",
    "service.CubeIcon.name": "Montaje de Accesorios Exteriores",
    "service.CubeIcon.description": "Montaje seguro para luces y enchufes con reemplazo profesional de cajas y bloques J.",
    "gallery.alt.1": "Moderna terraza de compuesto",
    "gallery.alt.2": "Elegante cerca de piscina de vidrio",
    "gallery.alt.3": "Instalación de protector de canaleta",
    "gallery.alt.4": "Amplio patio de madera",
    "gallery.alt.5": "Cerca de piscina de malla segura",
    "gallery.alt.6": "Terraza con iluminación integrada",
    "gallery.alt.7": "Primer plano de canaleta con micro-malla",
    "gallery.alt.8": "Elegante cercado de piscina de aluminio",
    "caseStudy.cs1.title": "Oasis Moderno en el Patio Trasero",
    "caseStudy.cs1.location": "Austin, TX",
    "caseStudy.cs1.description": "Una transformación completa de un patio suburbano en un oasis moderno. Construimos una terraza de compuesto de varios niveles de 500 pies cuadrados con iluminación integrada, perfecta para el entretenimiento. El proyecto también incluyó una elegante cerca de piscina de aluminio y vidrio para seguridad y estilo, asegurando una vista sin obstrucciones de la piscina. El cliente quería un espacio de bajo mantenimiento y alto impacto para reuniones familiares.",
    "caseStudy.cs2.title": "Casa de Campo en Carolina del Sur",
    "caseStudy.cs2.location": "Charleston, SC",
    "caseStudy.cs2.description": "Este proyecto implicó la instalación de protectores de canaletas sin costura en una gran casa de campo para proteger contra las fuertes lluvias estacionales y el bloqueo de agujas de pino. Utilizamos nuestro sistema de micro-malla premium para garantizar un rendimiento duradero y sin obstrucciones. El cliente ahora está libre de la peligrosa tarea de subir escaleras para limpiar las canaletas.",
  },
  'pt-BR': {
    "nav.estimator": "Orçamento",
    "nav.services": "Serviços",
    "nav.projects": "Projetos",
    "nav.gallery": "Galeria",
    "nav.reviews": "Avaliações",
    "nav.get_estimate": "Obter Orçamento Grátis",
    "nav.admin": "Painel Admin",
    "hero.title": "O Projeto dos Seus Sonhos, com Preço <span class=\"text-brand-gold\">Instantâneo</span>.",
    "hero.subtitle": "Pare de esperar por retornos de ligação. Use nossa ferramenta gratuita para obter um orçamento instantâneo e transparente para seu novo deck, cerca de piscina ou protetores de calha.",
    "hero.cta": "Iniciar Meu Orçamento Grátis",
    "simulator.title": "Obtenha um Orçamento em 60 Segundos",
    "simulator.subtitle": "Siga estes passos simples para obter um orçamento em tempo real para o seu projeto.",
    "simulator.step1_title": "1. Suas Informações de Contato",
    "simulator.step2_title": "2. Selecione o Tipo de Projeto",
    "simulator.step3_title": "3. Insira as Dimensões para seu {projectType}",
    "simulator.step4_title": "4. Escolha o Material",
    "simulator.step5_title": "5. Seu Orçamento Estimado",
    "simulator.label_name": "Nome Completo",
    "simulator.label_phone": "Número de Telefone",
    "simulator.label_city": "Cidade",
    "simulator.label_neighborhood": "Bairro / Região",
    "simulator.placeholder_name": "Ex: João da Silva",
    "simulator.placeholder_phone": "(11) 98765-4321",
    "simulator.placeholder_city": "Ex: São Paulo",
    "simulator.placeholder_neighborhood": "Ex: Jardins",
    "simulator.button_next_project": "Próximo: Selecionar Projeto",
    "simulator.button_next_material": "Próximo: Escolher Material",
    "simulator.button_back": "Voltar",
    "simulator.label_width": "Largura (metros)",
    "simulator.label_length": "Comprimento (metros)",
    "simulator.quote_title": "Estimativa de Custo do Projeto",
    "simulator.quote_date": "Data",
    "simulator.quote_prepared_for": "Preparado para:",
    "simulator.quote_estimated_cost": "Custo Estimado:",
    "simulator.quote_summary": "Resumo do Projeto:",
    "simulator.quote_item": "Item",
    "simulator.quote_details": "Detalhes",
    "simulator.quote_project_type": "Tipo de Projeto",
    "simulator.quote_dimensions": "Dimensões",
    "simulator.quote_material": "Material",
    "simulator.quote_disclaimer": "*Esta é uma estimativa preliminar. O custo final pode variar com base nas condições do local, recursos específicos e regulamentações locais.",
    "simulator.button_start_over": "Começar de Novo",
    "simulator.button_print": "Imprimir / Salvar PDF",
    "simulator.button_whatsapp": "Finalizar no WhatsApp",
    "trust.title": "Totalmente Licenciados, Segurados e Orgulhosamente Certificados",
    "trust.warranty": "Garantia de Mão de Obra de 5 Anos",
    "services.title": "Soluções Externas Completas",
    "services.subtitle": "De varandas teladas deslumbrantes a revestimentos duráveis, oferecemos uma vasta gama de serviços para valorizar sua casa.",
    "services.screenedPorch.title": "Serviços de Varandas Teladas e Calhas",
    "services.otherExterior.title": "Revestimentos, Cercas e Acabamentos",
    "casestudies.title": "Nossos Projetos em Destaque",
    "casestudies.subtitle": "Explore nosso portfólio de projetos de sucesso e veja a qualidade artesanal que entregamos.",
    "casestudies.view_project": "Ver Projeto",
    "gallery.title": "Qualidade que se Vê",
    "gallery.subtitle": "Navegue por nossa galeria de projetos recém-concluídos e encontre inspiração para sua própria casa.",
    "gallery.filter_all": "Todos os Projetos",
    "testimonials.title": "Aprovado por Proprietários Como Você",
    "testimonials.subtitle": "Não acredite apenas em nossa palavra. Veja o que nossos clientes satisfeitos têm a dizer.",
    "youtube.title": "Veja Nosso Trabalho em Ação",
    "youtube.subtitle": "Assista nossa equipe dar vida aos projetos, do design inicial à entrega final.",
    "footer.tagline": "Construindo espaços externos de qualidade com preços transparentes e mão de obra inigualável.",
    "footer.services_title": "Serviços",
    "footer.links_title": "Links Rápidos",
    "footer.contact_title": "Fale Conosco",
    "footer.contact_location": "Atendendo todo o Brasil",
    "footer.copyright": "© {year} DIAMOND Home Improvement. Todos os direitos reservados.",
    "casedetail.breadcrumb_home": "Início",
    "casedetail.breadcrumb_projects": "Projetos",
    "casedetail.not_found_title": "Projeto Não Encontrado",
    "casedetail.not_found_subtitle": "O projeto que você está procurando não existe ou foi movido.",
    "casedetail.not_found_cta": "Voltar aos Projetos",
    "casedetail.details_title": "Detalhes do Projeto",
    "casedetail.details_type": "Tipo:",
    "casedetail.details_size": "Tamanho:",
    "casedetail.description_title": "Descrição",
    "casedetail.cta": "Estimar um Projeto Semelhante",
    "deck": "Decks e Pátios",
    "pool_fence": "Cercas para Piscina",
    "gutters": "Protetores de Calha",
    "wood": "Madeira Tratada sob Pressão",
    "composite": "Compósito",
    "pvc": "Deck de PVC",
    "mesh": "Tela Removível",
    "glass": "Painel de Vidro",
    "aluminum": "Alumínio",
    "screen": "Tela de Metal",
    "micro_mesh": "Micro-Tela",
    "foam": "Inserto de Espuma",
    "service.ScreenPorchIcon.name": "Varandas Motorizadas e Comuns",
    "service.ScreenPorchIcon.description": "Soluções de telas personalizadas para aproveitar o ar livre sem insetos, combinando perfeitamente com sua casa e estilo de vida.",
    "service.WrenchScrewdriverIcon.name": "Reparo e Troca de Telas",
    "service.WrenchScrewdriverIcon.description": "De pequenos reparos a trocas completas com malha de alta qualidade para renovar sua varanda.",
    "service.ShieldCheckIcon.name": "Telas Especiais para Pets",
    "service.ShieldCheckIcon.description": "Malha durável e resistente a arranhões, projetada para manter seus animais de estimação seguros e contidos.",
    "service.BeakerIcon.name": "Instalação de Protetores de Calha",
    "service.BeakerIcon.description": "Protetores duráveis e resistentes a entupimentos que se encaixam perfeitamente em suas calhas existentes para evitar detritos.",
    "service.SidingIcon.name": "Troca de Revestimento de Vinil",
    "service.SidingIcon.description": "Substitua revestimentos rachados, desbotados ou danificados para restaurar a beleza e a proteção da sua casa.",
    "service.ShutterIcon.name": "Serviços de Persianas",
    "service.ShutterIcon.description": "Instalação, reparo e substituição profissional para melhorar a fachada da sua casa.",
    "service.FenceIcon.name": "Cercas e Painéis de Privacidade",
    "service.FenceIcon.description": "Cercas robustas para privacidade e segurança, incluindo divisórias de propriedade e painéis decorativos.",
    "service.CubeIcon.name": "Montagem de Acessórios Externos",
    "service.CubeIcon.description": "Montagem segura para luzes e tomadas com substituição profissional de caixas e blocos J.",
    "gallery.alt.1": "Deck de compósito moderno",
    "gallery.alt.2": "Cerca de piscina de vidro elegante",
    "gallery.alt.3": "Instalação de protetor de calha",
    "gallery.alt.4": "Pátio de madeira espaçoso",
    "gallery.alt.5": "Cerca de piscina de tela segura",
    "gallery.alt.6": "Deck com iluminação integrada",
    "gallery.alt.7": "Close-up de calha com micro-tela",
    "gallery.alt.8": "Cercado de piscina de alumínio elegante",
    "caseStudy.cs1.title": "Oásis Moderno no Quintal",
    "caseStudy.cs1.location": "Austin, TX",
    "caseStudy.cs1.description": "Uma transformação completa de um quintal suburbano em um oásis moderno. Construímos um deck de compósito de múltiplos níveis com 500 pés quadrados e iluminação integrada, perfeito para entretenimento. O projeto também incluiu uma cerca de piscina de alumínio e vidro para segurança e estilo, garantindo uma vista desobstruída da piscina. O cliente desejava um espaço de baixa manutenção e alto impacto para reuniões familiares.",
    "caseStudy.cs2.title": "Casa de Campo na Carolina do Sul",
    "caseStudy.cs2.location": "Charleston, SC",
    "caseStudy.cs2.description": "Este projeto envolveu a instalação de protetores de calha sem emendas em uma grande casa de campo para proteger contra fortes chuvas sazonais e bloqueio por agulhas de pinheiro. Usamos nosso sistema premium de micro-tela para garantir um desempenho duradouro e sem entupimentos. O cliente agora está livre da tarefa perigosa de subir escadas para limpar as calhas.",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const getInitialLanguage = (): string => {
    try {
        const storedLang = window.localStorage.getItem('diamond-lang');
        if (storedLang && translations[storedLang]) {
            return storedLang;
        }
        const browserLang = navigator.language.split('-')[0];
        if (browserLang === 'es') return 'es';
        if (browserLang === 'pt') return 'pt-BR';
    } catch (e) {
        // Ignore errors from environments where localStorage is not available
    }
    return 'en'; // Default language
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<string>(getInitialLanguage);

  useEffect(() => {
    try {
        window.localStorage.setItem('diamond-lang', language);
    } catch (e) {
        // Ignore errors
    }
  }, [language]);

  const setLanguage = (lang: string) => {
    if (translations[lang]) {
      setLanguageState(lang);
    }
  };

  const t = useCallback((key: string, options?: { [key: string]: string | number }): string => {
    let translation = translations[language]?.[key] || translations['en']?.[key] || key;
    if (options) {
        Object.keys(options).forEach(k => {
            translation = translation.replace(`{${k}}`, String(options[k]));
        });
    }
    return translation;
  }, [language]);

  const value = { language, setLanguage, t };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useTranslations = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useTranslations must be used within a LanguageProvider');
  }
  return context;
};
