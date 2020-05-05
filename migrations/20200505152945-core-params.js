const coreParams = [
  {
    "id": 1,
    "name": "PROPIA SIN DEUDA",
    "externalCode": "1",
    "parentId": 0,
    "type": "LIVING_HOUSEHOLD"
  },
  {
    "id": 2,
    "name": "PROPIA CON DEUDA",
    "externalCode": "2",
    "parentId": 0,
    "type": "LIVING_HOUSEHOLD"
  },
  {
    "id": 3,
    "name": "ARRENDADA",
    "externalCode": "3",
    "parentId": 0,
    "type": "LIVING_HOUSEHOLD"
  },
  {
    "id": 4,
    "name": "VIVE CON FAMILIARES",
    "externalCode": "4",
    "parentId": 0,
    "type": "LIVING_HOUSEHOLD"
  },
  {
    "id": 5,
    "name": "VIVE CON PADRES",
    "externalCode": "5",
    "parentId": 0,
    "type": "LIVING_HOUSEHOLD"
  },
  {
    "id": 6,
    "name": "FISCAL O EMPRESA",
    "externalCode": "6",
    "parentId": 0,
    "type": "LIVING_HOUSEHOLD"
  },
  {
    "id": 7,
    "name": "PRIMARIOS",
    "externalCode": "PR",
    "parentId": 0,
    "type": "ACADEMIC_LEVEL"
  },
  {
    "id": 8,
    "name": "SECUNDARIOS",
    "externalCode": "SE",
    "parentId": 0,
    "type": "ACADEMIC_LEVEL"
  },
  {
    "id": 9,
    "name": "SUPERIORES",
    "externalCode": "SU",
    "parentId": 0,
    "type": "ACADEMIC_LEVEL"
  },
  {
    "id": 10,
    "name": "POSTGRADO",
    "externalCode": "PO",
    "parentId": 0,
    "type": "ACADEMIC_LEVEL"
  },
  {
    "id": 11,
    "name": "OTROS",
    "externalCode": "OT",
    "parentId": 0,
    "type": "ACADEMIC_LEVEL"
  },
  {
    "id": 12,
    "name": "MAGISTER",
    "externalCode": "MA",
    "parentId": 0,
    "type": "ACADEMIC_LEVEL"
  },
  {
    "id": 13,
    "name": "SUPERIOR NO TERMINADO",
    "externalCode": "SN",
    "parentId": 0,
    "type": "ACADEMIC_LEVEL"
  },
  {
    "id": 14,
    "name": "VEHICULO",
    "externalCode": "VE",
    "parentId": 0,
    "type": "HERITAGE_TYPE"
  },
  {
    "id": 15,
    "name": "MAQUINARIA",
    "externalCode": "MA",
    "parentId": 0,
    "type": "HERITAGE_TYPE"
  },
  {
    "id": 16,
    "name": "PARTICIPACION SOCIEDAD",
    "externalCode": "PS",
    "parentId": 0,
    "type": "HERITAGE_TYPE"
  },
  {
    "id": 17,
    "name": "BIENES RAICES",
    "externalCode": "BR",
    "parentId": 0,
    "type": "HERITAGE_TYPE"
  },
  {
    "id": 18,
    "name": "Padre o Madre",
    "externalCode": "Padre o Madre",
    "parentId": 0,
    "type": "PERSONAL_REFERENCE_TYPE"
  },
  {
    "id": 19,
    "name": "Tío(a)",
    "externalCode": "Tío(a)",
    "parentId": 0,
    "type": "PERSONAL_REFERENCE_TYPE"
  },
  {
    "id": 20,
    "name": "Primo(a)",
    "externalCode": "Primo(a)",
    "parentId": 0,
    "type": "PERSONAL_REFERENCE_TYPE"
  },
  {
    "id": 21,
    "name": "Amigo(a)",
    "externalCode": "Amigo(a)",
    "parentId": 0,
    "type": "PERSONAL_REFERENCE_TYPE"
  },
  {
    "id": 22,
    "name": "Otro",
    "externalCode": "Otro",
    "parentId": 0,
    "type": "PERSONAL_REFERENCE_TYPE"
  },
  {
    "id": 23,
    "name": "CONTADO",
    "externalCode": "1",
    "parentId": 0,
    "type": "FINANCING_TYPE"
  },
  {
    "id": 24,
    "name": "CREDITO",
    "externalCode": "2",
    "parentId": 0,
    "type": "FINANCING_TYPE"
  },
  {
    "id": 25,
    "name": "OTROS",
    "externalCode": "3",
    "parentId": 0,
    "type": "FINANCING_TYPE"
  },
  {
    "id": 26,
    "name": "CONTRATA",
    "externalCode": "CN",
    "parentId": 0,
    "type": "EMPLOYMENT_CONTRACT_TYPE"
  },
  {
    "id": 27,
    "name": "FIJO",
    "externalCode": "DE",
    "parentId": 0,
    "type": "EMPLOYMENT_CONTRACT_TYPE"
  },
  {
    "id": 28,
    "name": "INDEFINIDO",
    "externalCode": "IN",
    "parentId": 0,
    "type": "EMPLOYMENT_CONTRACT_TYPE"
  },
  {
    "id": 29,
    "name": "FIJA",
    "externalCode": "FI",
    "parentId": 0,
    "type": "SALARY_TYPE"
  },
  {
    "id": 30,
    "name": "VARIABLE",
    "externalCode": "VA",
    "parentId": 0,
    "type": "SALARY_TYPE"
  },
  {
    "id": 31,
    "name": "SOLTERO",
    "externalCode": "SO",
    "parentId": 0,
    "type": "MARITAL_STATUS"
  },
  {
    "id": 32,
    "name": "CASADO",
    "externalCode": "CA",
    "parentId": 0,
    "type": "MARITAL_STATUS"
  },
  {
    "id": 33,
    "name": "DIVORCIADO",
    "externalCode": "SL",
    "parentId": 0,
    "type": "MARITAL_STATUS"
  },
  {
    "id": 34,
    "name": "SEPARADO DE HECHO",
    "externalCode": "SH",
    "parentId": 0,
    "type": "MARITAL_STATUS"
  },
  {
    "id": 35,
    "name": "VIUDO",
    "externalCode": "VI",
    "parentId": 0,
    "type": "MARITAL_STATUS"
  },
  {
    "id": 36,
    "name": "EN PAREJA",
    "externalCode": "EP",
    "parentId": 0,
    "type": "MARITAL_STATUS"
  },
  {
    "id": 37,
    "name": "EN COMUNIDAD DE BIENES",
    "externalCode": "CB",
    "parentId": 0,
    "type": "MARITAL_REGIME"
  },
  {
    "id": 38,
    "name": "SEPARACION DE BIENES",
    "externalCode": "SB",
    "parentId": 0,
    "type": "MARITAL_REGIME"
  },
  {
    "id": 39,
    "name": "PARTICIPACION DE GANANCIAS",
    "externalCode": "PG",
    "parentId": 0,
    "type": "MARITAL_REGIME"
  },
  {
    "id": 40,
    "name": "NO APLICA",
    "externalCode": "NA",
    "parentId": 0,
    "type": "MARITAL_REGIME"
  },
  {
    "id": 41,
    "name": "DEPENDIENTE",
    "externalCode": "DE",
    "parentId": 0,
    "type": "WORK_TYPE"
  },
  {
    "id": 42,
    "name": "INDEPENDIENTE",
    "externalCode": "IN",
    "parentId": 0,
    "type": "WORK_TYPE"
  },
  {
    "id": 43,
    "name": "CHILENO",
    "externalCode": "CHILE",
    "parentId": 0,
    "type": "NATIONALITY"
  },
  {
    "id": 44,
    "name": "EXTRANJERO",
    "externalCode": "EXTRANJERO",
    "parentId": 0,
    "type": "NATIONALITY"
  },
  {
    "id": 45,
    "name": "MASCULINO",
    "externalCode": "M",
    "parentId": 0,
    "type": "GENDER_TYPE"
  },
  {
    "id": 46,
    "name": "FEMENINO",
    "externalCode": "F",
    "parentId": 0,
    "type": "GENDER_TYPE"
  },
  {
    "id": 47,
    "name": "OTRO",
    "externalCode": "O",
    "parentId": 0,
    "type": "GENDER_TYPE"
  },
  {
    "id": 48,
    "name": "Agricultor Propietario",
    "externalCode": "1",
    "parentId": 0,
    "type": "ACTIVITY_TYPE"
  },
  {
    "id": 49,
    "name": "Artesano",
    "externalCode": "2",
    "parentId": 0,
    "type": "ACTIVITY_TYPE"
  },
  {
    "id": 50,
    "name": "Comerciante",
    "externalCode": "3",
    "parentId": 0,
    "type": "ACTIVITY_TYPE"
  },
  {
    "id": 51,
    "name": "Dependiente No Profesional",
    "externalCode": "4",
    "parentId": 0,
    "type": "ACTIVITY_TYPE"
  },
  {
    "id": 52,
    "name": "Dependiente Profesional",
    "externalCode": "5",
    "parentId": 0,
    "type": "ACTIVITY_TYPE"
  },
  {
    "id": 53,
    "name": "Dueña de Casa",
    "externalCode": "6",
    "parentId": 0,
    "type": "ACTIVITY_TYPE"
  },
  {
    "id": 54,
    "name": "Empresario Individual",
    "externalCode": "7",
    "parentId": 0,
    "type": "ACTIVITY_TYPE"
  },
  {
    "id": 55,
    "name": "Empresario más de 5 trabajadores",
    "externalCode": "8",
    "parentId": 0,
    "type": "ACTIVITY_TYPE"
  },
  {
    "id": 56,
    "name": "Estudiante",
    "externalCode": "9",
    "parentId": 0,
    "type": "ACTIVITY_TYPE"
  },
  {
    "id": 57,
    "name": "FF.AA.",
    "externalCode": "10",
    "parentId": 0,
    "type": "ACTIVITY_TYPE"
  },
  {
    "id": 58,
    "name": "Funcionario de Gobierno",
    "externalCode": "11",
    "parentId": 0,
    "type": "ACTIVITY_TYPE"
  },
  {
    "id": 59,
    "name": "Gerente Empresas Prime",
    "externalCode": "12",
    "parentId": 0,
    "type": "ACTIVITY_TYPE"
  },
  {
    "id": 60,
    "name": "Independiente No Profesional",
    "externalCode": "13",
    "parentId": 0,
    "type": "ACTIVITY_TYPE"
  },
  {
    "id": 61,
    "name": "Independiente Profesional",
    "externalCode": "14",
    "parentId": 0,
    "type": "ACTIVITY_TYPE"
  },
  {
    "id": 62,
    "name": "Jubilado / Pensionado / Montepiado",
    "externalCode": "15",
    "parentId": 0,
    "type": "ACTIVITY_TYPE"
  },
  {
    "id": 63,
    "name": "Obrero /Jornalero",
    "externalCode": "16",
    "parentId": 0,
    "type": "ACTIVITY_TYPE"
  },
  {
    "id": 64,
    "name": "Otros",
    "externalCode": "17",
    "parentId": 0,
    "type": "ACTIVITY_TYPE"
  },
  {
    "id": 65,
    "name": "Profesor",
    "externalCode": "18",
    "parentId": 0,
    "type": "ACTIVITY_TYPE"
  },
  {
    "id": 66,
    "name": "Rentista",
    "externalCode": "19",
    "parentId": 0,
    "type": "ACTIVITY_TYPE"
  },
  {
    "id": 67,
    "name": "Sostenedor",
    "externalCode": "20",
    "parentId": 0,
    "type": "ACTIVITY_TYPE"
  },
  {
    "id": 68,
    "name": "Temporero",
    "externalCode": "21",
    "parentId": 0,
    "type": "ACTIVITY_TYPE"
  },
  {
    "id": 69,
    "name": "Transportista de Carga",
    "externalCode": "22",
    "parentId": 0,
    "type": "ACTIVITY_TYPE"
  },
  {
    "id": 70,
    "name": "Transportista de Pasajeros",
    "externalCode": "23",
    "parentId": 0,
    "type": "ACTIVITY_TYPE"
  },
  {
    "id": 71,
    "name": "Vendedor A (RF < RME)",
    "externalCode": "24",
    "parentId": 0,
    "type": "ACTIVITY_TYPE"
  },
  {
    "id": 72,
    "name": "Vendedor B (RF >= RME)",
    "externalCode": "25",
    "parentId": 0,
    "type": "ACTIVITY_TYPE"
  },
  {
    "id": 73,
    "name": "Empleada Casa Particular",
    "externalCode": "26",
    "parentId": 0,
    "type": "ACTIVITY_TYPE"
  },
  {
    "id": 74,
    "name": "Profesional",
    "externalCode": "27",
    "parentId": 0,
    "type": "ACTIVITY_TYPE"
  },
  {
    "id": 75,
    "name": "Gerente / Administrador",
    "externalCode": "28",
    "parentId": 0,
    "type": "ACTIVITY_TYPE"
  },
  {
    "id": 76,
    "name": "Vendedor",
    "externalCode": "29",
    "parentId": 0,
    "type": "ACTIVITY_TYPE"
  },
  {
    "id": 77,
    "name": "Obrero / Jornalero",
    "externalCode": "31",
    "parentId": 0,
    "type": "ACTIVITY_TYPE"
  },
  {
    "id": 78,
    "name": "Transportista Escolar",
    "externalCode": "33",
    "parentId": 0,
    "type": "ACTIVITY_TYPE"
  },
  {
    "id": 79,
    "name": "Tecnico",
    "externalCode": "34",
    "parentId": 0,
    "type": "ACTIVITY_TYPE"
  },
  {
    "id": 80,
    "name": "Empleado Oficina",
    "externalCode": "35",
    "parentId": 0,
    "type": "ACTIVITY_TYPE"
  },
  {
    "id": 81,
    "name": "Agricultor / Ganadero / Pescado",
    "externalCode": "36",
    "parentId": 0,
    "type": "ACTIVITY_TYPE"
  },
  {
    "id": 82,
    "name": "Gendarmen",
    "externalCode": "37",
    "parentId": 0,
    "type": "ACTIVITY_TYPE"
  },
  {
    "id": 83,
    "name": "Comercio",
    "externalCode": "38",
    "parentId": 0,
    "type": "ACTIVITY_TYPE"
  },
  {
    "id": 84,
    "name": "FF.A.A., carabineros e investigaciones",
    "externalCode": "39",
    "parentId": 0,
    "type": "ACTIVITY_TYPE"
  },
  {
    "id": 85,
    "name": "Empresario",
    "externalCode": "40",
    "parentId": 0,
    "type": "ACTIVITY_TYPE"
  },
  {
    "id": 86,
    "name": "Transportista / Transporte",
    "externalCode": "41",
    "parentId": 0,
    "type": "ACTIVITY_TYPE"
  },
  {
    "id": 87,
    "name": "Transportista Publico",
    "externalCode": "42",
    "parentId": 0,
    "type": "ACTIVITY_TYPE"
  },
  {
    "id": 88,
    "name": "Asesor Financiero",
    "externalCode": "43",
    "parentId": 0,
    "type": "ACTIVITY_TYPE"
  },
  {
    "id": 89,
    "name": "Jubilado",
    "externalCode": "44",
    "parentId": 0,
    "type": "ACTIVITY_TYPE"
  },
  {
    "id": 90,
    "name": "Operador",
    "externalCode": "45",
    "parentId": 0,
    "type": "ACTIVITY_TYPE"
  },
  {
    "id": 91,
    "name": "Sub Gerente",
    "externalCode": "46",
    "parentId": 0,
    "type": "ACTIVITY_TYPE"
  },
  {
    "id": 92,
    "name": "Jefe Area / Local",
    "externalCode": "47",
    "parentId": 0,
    "type": "ACTIVITY_TYPE"
  },
  {
    "id": 93,
    "name": "Profesor / Educador",
    "externalCode": "48",
    "parentId": 0,
    "type": "ACTIVITY_TYPE"
  },
  {
    "id": 94,
    "name": "Medico",
    "externalCode": "49",
    "parentId": 0,
    "type": "ACTIVITY_TYPE"
  },
  {
    "id": 95,
    "name": "Dueño",
    "externalCode": "50",
    "parentId": 0,
    "type": "ACTIVITY_TYPE"
  },
  {
    "id": 96,
    "name": "Agricultura, Ganadería, Caza y Silvicultura",
    "externalCode": "51",
    "parentId": 0,
    "type": "ACTIVITY_TYPE"
  },
  {
    "id": 97,
    "name": "Pesca",
    "externalCode": "52",
    "parentId": 0,
    "type": "ACTIVITY_TYPE"
  },
  {
    "id": 98,
    "name": "Explotación de Minas y Canteras",
    "externalCode": "53",
    "parentId": 0,
    "type": "ACTIVITY_TYPE"
  },
  {
    "id": 99,
    "name": "Industrias Manufactureras No Metálicas",
    "externalCode": "54",
    "parentId": 0,
    "type": "ACTIVITY_TYPE"
  },
  {
    "id": 100,
    "name": "Industrias Manufactureras Metálicas",
    "externalCode": "55",
    "parentId": 0,
    "type": "ACTIVITY_TYPE"
  },
  {
    "id": 101,
    "name": "Suministro de Electricidad, Gas y Agua",
    "externalCode": "56",
    "parentId": 0,
    "type": "ACTIVITY_TYPE"
  },
  {
    "id": 102,
    "name": "Construcción",
    "externalCode": "57",
    "parentId": 0,
    "type": "ACTIVITY_TYPE"
  },
  {
    "id": 103,
    "name": "Comercio al Por Mayor y Menor",
    "externalCode": "58",
    "parentId": 0,
    "type": "ACTIVITY_TYPE"
  },
  {
    "id": 104,
    "name": "Hoteles y Restaurantes",
    "externalCode": "59",
    "parentId": 0,
    "type": "ACTIVITY_TYPE"
  },
  {
    "id": 105,
    "name": "Transporte, Almacenamiento y Comunicaciones",
    "externalCode": "60",
    "parentId": 0,
    "type": "ACTIVITY_TYPE"
  },
  {
    "id": 106,
    "name": "Intermediación Financiera",
    "externalCode": "61",
    "parentId": 0,
    "type": "ACTIVITY_TYPE"
  },
  {
    "id": 107,
    "name": "Act. Inmobiliarias, Empresariales y de Alquiler",
    "externalCode": "62",
    "parentId": 0,
    "type": "ACTIVITY_TYPE"
  },
  {
    "id": 108,
    "name": "Adm. Pública y Defensa",
    "externalCode": "63",
    "parentId": 0,
    "type": "ACTIVITY_TYPE"
  },
  {
    "id": 109,
    "name": "Enseñanza",
    "externalCode": "64",
    "parentId": 0,
    "type": "ACTIVITY_TYPE"
  },
  {
    "id": 110,
    "name": "Servicios Sociales y de Salud",
    "externalCode": "65",
    "parentId": 0,
    "type": "ACTIVITY_TYPE"
  },
  {
    "id": 111,
    "name": "Otras Actividades de Servicios Comunitarias",
    "externalCode": "66",
    "parentId": 0,
    "type": "ACTIVITY_TYPE"
  },
  {
    "id": 112,
    "name": "Consejo de Adm. de Edificios y Condominios",
    "externalCode": "67",
    "parentId": 0,
    "type": "ACTIVITY_TYPE"
  },
  {
    "id": 113,
    "name": "Organizaciones y Órganos Extraterritoriales",
    "externalCode": "68",
    "parentId": 0,
    "type": "ACTIVITY_TYPE"
  },
  {
    "id": 114,
    "name": "PESCA",
    "externalCode": "1",
    "parentId": 0,
    "type": "BUSINESS_SECTOR"
  },
  {
    "id": 115,
    "name": "MINERIA",
    "externalCode": "2",
    "parentId": 0,
    "type": "BUSINESS_SECTOR"
  },
  {
    "id": 116,
    "name": "PRENSA",
    "externalCode": "3",
    "parentId": 0,
    "type": "BUSINESS_SECTOR"
  },
  {
    "id": 117,
    "name": "TEXTIL",
    "externalCode": "4",
    "parentId": 0,
    "type": "BUSINESS_SECTOR"
  },
  {
    "id": 118,
    "name": "COMERCIO",
    "externalCode": "5",
    "parentId": 0,
    "type": "BUSINESS_SECTOR"
  },
  {
    "id": 119,
    "name": "TRANSPORTE",
    "externalCode": "6",
    "parentId": 0,
    "type": "BUSINESS_SECTOR"
  },
  {
    "id": 120,
    "name": "MANUFACTURA",
    "externalCode": "7",
    "parentId": 0,
    "type": "BUSINESS_SECTOR"
  },
  {
    "id": 121,
    "name": "SERVICIOS",
    "externalCode": "8",
    "parentId": 0,
    "type": "BUSINESS_SECTOR"
  },
  {
    "id": 122,
    "name": "ENERGIA",
    "externalCode": "9",
    "parentId": 0,
    "type": "BUSINESS_SECTOR"
  },
  {
    "id": 123,
    "name": "ELECTRICIDAD, GAS Y AGUA",
    "externalCode": "10",
    "parentId": 0,
    "type": "BUSINESS_SECTOR"
  },
  {
    "id": 124,
    "name": "CONSTRUCCION",
    "externalCode": "11",
    "parentId": 0,
    "type": "BUSINESS_SECTOR"
  },
  {
    "id": 125,
    "name": "COMUNICACIONES",
    "externalCode": "12",
    "parentId": 0,
    "type": "BUSINESS_SECTOR"
  },
  {
    "id": 126,
    "name": "SERVICIOS FINANCIEROS",
    "externalCode": "13",
    "parentId": 0,
    "type": "BUSINESS_SECTOR"
  },
  {
    "id": 127,
    "name": "ENTIDADES FISCALES",
    "externalCode": "14",
    "parentId": 0,
    "type": "BUSINESS_SECTOR"
  },
  {
    "id": 128,
    "name": "MAQUINARIA PESADA - NUEVOS",
    "externalCode": "NM",
    "parentId": 0,
    "type": "VEHICLE_TYPE"
  },
  {
    "id": 129,
    "name": "COMERCIAL - NUEVO",
    "externalCode": "NP",
    "parentId": 0,
    "type": "VEHICLE_TYPE"
  },
  {
    "id": 130,
    "name": "MOTOS - NUEVAS",
    "externalCode": "NT",
    "parentId": 0,
    "type": "VEHICLE_TYPE"
  },
  {
    "id": 131,
    "name": "LIVIANO - NUEVO",
    "externalCode": "NU",
    "parentId": 0,
    "type": "VEHICLE_TYPE"
  },
  {
    "id": 132,
    "name": "MAQUINARIA PESADA - USADOS",
    "externalCode": "UM",
    "parentId": 0,
    "type": "VEHICLE_TYPE"
  },
  {
    "id": 133,
    "name": "COMERCIAL - USADO",
    "externalCode": "UP",
    "parentId": 0,
    "type": "VEHICLE_TYPE"
  },
  {
    "id": 134,
    "name": "LIVIANO - USADO",
    "externalCode": "US",
    "parentId": 0,
    "type": "VEHICLE_TYPE"
  },
  {
    "id": 135,
    "name": "MOTOS - USADAS",
    "externalCode": "UT",
    "parentId": 0,
    "type": "VEHICLE_TYPE"
  },
  {
    "id": 136,
    "name": "Chile",
    "externalCode": "CHL",
    "parentId": 0,
    "type": "COUNTRY"
  },
  {
    "id": 137,
    "name": "Perú",
    "externalCode": "PER",
    "parentId": 0,
    "type": "COUNTRY"
  },
  {
    "id": 138,
    "name": "I REGION",
    "externalCode": "1",
    "parentId": 136,
    "type": "REGION"
  },
  {
    "id": 139,
    "name": "II REGION",
    "externalCode": "2",
    "parentId": 136,
    "type": "REGION"
  },
  {
    "id": 140,
    "name": "III REGION",
    "externalCode": "3",
    "parentId": 136,
    "type": "REGION"
  },
  {
    "id": 141,
    "name": "IV REGION",
    "externalCode": "4",
    "parentId": 136,
    "type": "REGION"
  },
  {
    "id": 142,
    "name": "IX REGION",
    "externalCode": "9",
    "parentId": 136,
    "type": "REGION"
  },
  {
    "id": 143,
    "name": "REGION METROPOLITANA",
    "externalCode": "13",
    "parentId": 136,
    "type": "REGION"
  },
  {
    "id": 144,
    "name": "V REGION",
    "externalCode": "5",
    "parentId": 136,
    "type": "REGION"
  },
  {
    "id": 145,
    "name": "VI REGION",
    "externalCode": "6",
    "parentId": 136,
    "type": "REGION"
  },
  {
    "id": 146,
    "name": "VII REGION",
    "externalCode": "7",
    "parentId": 136,
    "type": "REGION"
  },
  {
    "id": 147,
    "name": "VIII REGION",
    "externalCode": "8",
    "parentId": 136,
    "type": "REGION"
  },
  {
    "id": 148,
    "name": "X REGION",
    "externalCode": "10",
    "parentId": 136,
    "type": "REGION"
  },
  {
    "id": 149,
    "name": "XI REGION",
    "externalCode": "11",
    "parentId": 136,
    "type": "REGION"
  },
  {
    "id": 150,
    "name": "XII REGION",
    "externalCode": "12",
    "parentId": 136,
    "type": "REGION"
  },
  {
    "id": 151,
    "name": "XIV REGION",
    "externalCode": "14",
    "parentId": 136,
    "type": "REGION"
  },
  {
    "id": 152,
    "name": "XV REGION",
    "externalCode": "15",
    "parentId": 136,
    "type": "REGION"
  },
  {
    "id": 153,
    "name": "XVI REGION",
    "externalCode": "16",
    "parentId": 136,
    "type": "REGION"
  },
  {
    "id": 154,
    "name": "AISEN",
    "externalCode": "11201",
    "parentId": 149,
    "type": "COMMUNE"
  },
  {
    "id": 155,
    "name": "ALGARROBO",
    "externalCode": "5602",
    "parentId": 144,
    "type": "COMMUNE"
  },
  {
    "id": 156,
    "name": "ALHUE",
    "externalCode": "13502",
    "parentId": 143,
    "type": "COMMUNE"
  },
  {
    "id": 157,
    "name": "ALTO DEL CARMEN",
    "externalCode": "3302",
    "parentId": 140,
    "type": "COMMUNE"
  },
  {
    "id": 158,
    "name": "ALTO HOSPICIO",
    "externalCode": "1303",
    "parentId": 138,
    "type": "COMMUNE"
  },
  {
    "id": 159,
    "name": "ANCUD",
    "externalCode": "10202",
    "parentId": 148,
    "type": "COMMUNE"
  },
  {
    "id": 160,
    "name": "ANDACOLLO",
    "externalCode": "4103",
    "parentId": 141,
    "type": "COMMUNE"
  },
  {
    "id": 161,
    "name": "ANGOL",
    "externalCode": "9201",
    "parentId": 142,
    "type": "COMMUNE"
  },
  {
    "id": 162,
    "name": "ANTARTICA",
    "externalCode": "12202",
    "parentId": 150,
    "type": "COMMUNE"
  },
  {
    "id": 163,
    "name": "ANTOFAGASTA",
    "externalCode": "2101",
    "parentId": 139,
    "type": "COMMUNE"
  },
  {
    "id": 164,
    "name": "ANTUCO",
    "externalCode": "8302",
    "parentId": 147,
    "type": "COMMUNE"
  },
  {
    "id": 165,
    "name": "ARAUCO",
    "externalCode": "8202",
    "parentId": 147,
    "type": "COMMUNE"
  },
  {
    "id": 166,
    "name": "ARICA",
    "externalCode": "1501",
    "parentId": 152,
    "type": "COMMUNE"
  },
  {
    "id": 167,
    "name": "BUIN",
    "externalCode": "13402",
    "parentId": 143,
    "type": "COMMUNE"
  },
  {
    "id": 168,
    "name": "BULNES",
    "externalCode": "8402",
    "parentId": 153,
    "type": "COMMUNE"
  },
  {
    "id": 169,
    "name": "CABILDO",
    "externalCode": "5402",
    "parentId": 144,
    "type": "COMMUNE"
  },
  {
    "id": 170,
    "name": "CABRERO",
    "externalCode": "8303",
    "parentId": 147,
    "type": "COMMUNE"
  },
  {
    "id": 171,
    "name": "CALAMA",
    "externalCode": "2201",
    "parentId": 139,
    "type": "COMMUNE"
  },
  {
    "id": 172,
    "name": "CALBUCO",
    "externalCode": "10102",
    "parentId": 148,
    "type": "COMMUNE"
  },
  {
    "id": 173,
    "name": "CALDERA",
    "externalCode": "3102",
    "parentId": 140,
    "type": "COMMUNE"
  },
  {
    "id": 174,
    "name": "CALERA",
    "externalCode": "5502",
    "parentId": 144,
    "type": "COMMUNE"
  },
  {
    "id": 175,
    "name": "CALERA DE TANGO",
    "externalCode": "13403",
    "parentId": 143,
    "type": "COMMUNE"
  },
  {
    "id": 176,
    "name": "CALLE LARGA",
    "externalCode": "5302",
    "parentId": 144,
    "type": "COMMUNE"
  },
  {
    "id": 177,
    "name": "CAMARONES",
    "externalCode": "1502",
    "parentId": 152,
    "type": "COMMUNE"
  },
  {
    "id": 178,
    "name": "CAMIÑA",
    "externalCode": "1102",
    "parentId": 138,
    "type": "COMMUNE"
  },
  {
    "id": 179,
    "name": "CANELA",
    "externalCode": "4202",
    "parentId": 141,
    "type": "COMMUNE"
  },
  {
    "id": 180,
    "name": "CAÑETE",
    "externalCode": "8203",
    "parentId": 147,
    "type": "COMMUNE"
  },
  {
    "id": 181,
    "name": "CARAHUE",
    "externalCode": "9102",
    "parentId": 142,
    "type": "COMMUNE"
  },
  {
    "id": 182,
    "name": "CARTAGENA",
    "externalCode": "5603",
    "parentId": 144,
    "type": "COMMUNE"
  },
  {
    "id": 183,
    "name": "CASABLANCA",
    "externalCode": "5102",
    "parentId": 144,
    "type": "COMMUNE"
  },
  {
    "id": 184,
    "name": "CASTRO",
    "externalCode": "10201",
    "parentId": 148,
    "type": "COMMUNE"
  },
  {
    "id": 185,
    "name": "CATEMU",
    "externalCode": "5702",
    "parentId": 144,
    "type": "COMMUNE"
  },
  {
    "id": 186,
    "name": "CAUQUENES",
    "externalCode": "7201",
    "parentId": 146,
    "type": "COMMUNE"
  },
  {
    "id": 187,
    "name": "CERRILLOS",
    "externalCode": "13102",
    "parentId": 143,
    "type": "COMMUNE"
  },
  {
    "id": 188,
    "name": "CERRO NAVIA",
    "externalCode": "13103",
    "parentId": 143,
    "type": "COMMUNE"
  },
  {
    "id": 189,
    "name": "CHAITEN",
    "externalCode": "10401",
    "parentId": 148,
    "type": "COMMUNE"
  },
  {
    "id": 190,
    "name": "CHANCO",
    "externalCode": "7202",
    "parentId": 146,
    "type": "COMMUNE"
  },
  {
    "id": 191,
    "name": "CHAÑARAL",
    "externalCode": "3201",
    "parentId": 140,
    "type": "COMMUNE"
  },
  {
    "id": 192,
    "name": "CHEPICA",
    "externalCode": "6302",
    "parentId": 145,
    "type": "COMMUNE"
  },
  {
    "id": 193,
    "name": "CHIGUAYANTE",
    "externalCode": "8103",
    "parentId": 147,
    "type": "COMMUNE"
  },
  {
    "id": 194,
    "name": "CHILE CHICO",
    "externalCode": "11401",
    "parentId": 149,
    "type": "COMMUNE"
  },
  {
    "id": 195,
    "name": "CHILLAN",
    "externalCode": "8401",
    "parentId": 153,
    "type": "COMMUNE"
  },
  {
    "id": 196,
    "name": "CHILLAN VIEJO",
    "externalCode": "8406",
    "parentId": 153,
    "type": "COMMUNE"
  },
  {
    "id": 197,
    "name": "CHIMBARONGO",
    "externalCode": "6303",
    "parentId": 145,
    "type": "COMMUNE"
  },
  {
    "id": 198,
    "name": "CHONCHI",
    "externalCode": "10203",
    "parentId": 148,
    "type": "COMMUNE"
  },
  {
    "id": 199,
    "name": "CISNES",
    "externalCode": "11202",
    "parentId": 149,
    "type": "COMMUNE"
  },
  {
    "id": 200,
    "name": "COBQUECURA",
    "externalCode": "8403",
    "parentId": 153,
    "type": "COMMUNE"
  },
  {
    "id": 201,
    "name": "COCHAMO",
    "externalCode": "10103",
    "parentId": 148,
    "type": "COMMUNE"
  },
  {
    "id": 202,
    "name": "COCHRANE",
    "externalCode": "11301",
    "parentId": 149,
    "type": "COMMUNE"
  },
  {
    "id": 203,
    "name": "CODEGUA",
    "externalCode": "6102",
    "parentId": 145,
    "type": "COMMUNE"
  },
  {
    "id": 204,
    "name": "COELEMU",
    "externalCode": "8404",
    "parentId": 153,
    "type": "COMMUNE"
  },
  {
    "id": 205,
    "name": "COIHUECO",
    "externalCode": "8405",
    "parentId": 153,
    "type": "COMMUNE"
  },
  {
    "id": 206,
    "name": "COINCO",
    "externalCode": "6103",
    "parentId": 145,
    "type": "COMMUNE"
  },
  {
    "id": 207,
    "name": "COLBUN",
    "externalCode": "7402",
    "parentId": 146,
    "type": "COMMUNE"
  },
  {
    "id": 208,
    "name": "COLCHANE",
    "externalCode": "1103",
    "parentId": 138,
    "type": "COMMUNE"
  },
  {
    "id": 209,
    "name": "COLINA",
    "externalCode": "13301",
    "parentId": 143,
    "type": "COMMUNE"
  },
  {
    "id": 210,
    "name": "COLLIPULLI",
    "externalCode": "9202",
    "parentId": 142,
    "type": "COMMUNE"
  },
  {
    "id": 211,
    "name": "COLTAUCO",
    "externalCode": "6104",
    "parentId": 145,
    "type": "COMMUNE"
  },
  {
    "id": 212,
    "name": "COMBARBALA",
    "externalCode": "4302",
    "parentId": 141,
    "type": "COMMUNE"
  },
  {
    "id": 213,
    "name": "CONCEPCION",
    "externalCode": "8101",
    "parentId": 147,
    "type": "COMMUNE"
  },
  {
    "id": 214,
    "name": "CONCHALI",
    "externalCode": "13104",
    "parentId": 143,
    "type": "COMMUNE"
  },
  {
    "id": 215,
    "name": "CON-CON",
    "externalCode": "5103",
    "parentId": 144,
    "type": "COMMUNE"
  },
  {
    "id": 216,
    "name": "CONSTITUCION",
    "externalCode": "7102",
    "parentId": 146,
    "type": "COMMUNE"
  },
  {
    "id": 217,
    "name": "CONTULMO",
    "externalCode": "8204",
    "parentId": 147,
    "type": "COMMUNE"
  },
  {
    "id": 218,
    "name": "COPIAPO",
    "externalCode": "3101",
    "parentId": 140,
    "type": "COMMUNE"
  },
  {
    "id": 219,
    "name": "COQUIMBO",
    "externalCode": "4102",
    "parentId": 141,
    "type": "COMMUNE"
  },
  {
    "id": 220,
    "name": "CORONEL",
    "externalCode": "8102",
    "parentId": 147,
    "type": "COMMUNE"
  },
  {
    "id": 221,
    "name": "CORRAL",
    "externalCode": "1401",
    "parentId": 151,
    "type": "COMMUNE"
  },
  {
    "id": 222,
    "name": "COYHAIQUE",
    "externalCode": "11101",
    "parentId": 149,
    "type": "COMMUNE"
  },
  {
    "id": 223,
    "name": "CUNCO",
    "externalCode": "9103",
    "parentId": 142,
    "type": "COMMUNE"
  },
  {
    "id": 224,
    "name": "CURACAUTIN",
    "externalCode": "9203",
    "parentId": 142,
    "type": "COMMUNE"
  },
  {
    "id": 225,
    "name": "CURACAVI",
    "externalCode": "13503",
    "parentId": 143,
    "type": "COMMUNE"
  },
  {
    "id": 226,
    "name": "CURACO DE VELEZ",
    "externalCode": "10204",
    "parentId": 148,
    "type": "COMMUNE"
  },
  {
    "id": 227,
    "name": "CURANILAHUE",
    "externalCode": "8205",
    "parentId": 147,
    "type": "COMMUNE"
  },
  {
    "id": 228,
    "name": "CURARREHUE",
    "externalCode": "9104",
    "parentId": 142,
    "type": "COMMUNE"
  },
  {
    "id": 229,
    "name": "CUREPTO",
    "externalCode": "7103",
    "parentId": 146,
    "type": "COMMUNE"
  },
  {
    "id": 230,
    "name": "CURICO",
    "externalCode": "7301",
    "parentId": 146,
    "type": "COMMUNE"
  },
  {
    "id": 231,
    "name": "DALCAHUE",
    "externalCode": "10205",
    "parentId": 148,
    "type": "COMMUNE"
  },
  {
    "id": 232,
    "name": "DIEGO DE ALMAGRO",
    "externalCode": "3202",
    "parentId": 140,
    "type": "COMMUNE"
  },
  {
    "id": 233,
    "name": "DOÑIHUE",
    "externalCode": "6105",
    "parentId": 145,
    "type": "COMMUNE"
  },
  {
    "id": 234,
    "name": "EL BOSQUE",
    "externalCode": "13105",
    "parentId": 143,
    "type": "COMMUNE"
  },
  {
    "id": 235,
    "name": "EL CARMEN",
    "externalCode": "8407",
    "parentId": 153,
    "type": "COMMUNE"
  },
  {
    "id": 236,
    "name": "EL MONTE",
    "externalCode": "13602",
    "parentId": 143,
    "type": "COMMUNE"
  },
  {
    "id": 237,
    "name": "EL QUISCO",
    "externalCode": "5604",
    "parentId": 144,
    "type": "COMMUNE"
  },
  {
    "id": 238,
    "name": "EL SALVADOR",
    "externalCode": "3305",
    "parentId": 140,
    "type": "COMMUNE"
  },
  {
    "id": 239,
    "name": "EL TABO",
    "externalCode": "5605",
    "parentId": 144,
    "type": "COMMUNE"
  },
  {
    "id": 240,
    "name": "EMPEDRADO",
    "externalCode": "7104",
    "parentId": 146,
    "type": "COMMUNE"
  },
  {
    "id": 241,
    "name": "ERCILLA",
    "externalCode": "9204",
    "parentId": 142,
    "type": "COMMUNE"
  },
  {
    "id": 242,
    "name": "ESTACION CENTRAL",
    "externalCode": "13106",
    "parentId": 143,
    "type": "COMMUNE"
  },
  {
    "id": 243,
    "name": "FLORIDA",
    "externalCode": "8104",
    "parentId": 147,
    "type": "COMMUNE"
  },
  {
    "id": 244,
    "name": "FREIRE",
    "externalCode": "9105",
    "parentId": 142,
    "type": "COMMUNE"
  },
  {
    "id": 245,
    "name": "FREIRINA",
    "externalCode": "3303",
    "parentId": 140,
    "type": "COMMUNE"
  },
  {
    "id": 246,
    "name": "FRESIA",
    "externalCode": "10104",
    "parentId": 148,
    "type": "COMMUNE"
  },
  {
    "id": 247,
    "name": "FRUTILLAR",
    "externalCode": "10105",
    "parentId": 148,
    "type": "COMMUNE"
  },
  {
    "id": 248,
    "name": "FUTALEUFU",
    "externalCode": "10402",
    "parentId": 148,
    "type": "COMMUNE"
  },
  {
    "id": 249,
    "name": "FUTRONO",
    "externalCode": "1402",
    "parentId": 151,
    "type": "COMMUNE"
  },
  {
    "id": 250,
    "name": "GALVARINO",
    "externalCode": "9106",
    "parentId": 142,
    "type": "COMMUNE"
  },
  {
    "id": 251,
    "name": "GENERAL LAGOS",
    "externalCode": "1503",
    "parentId": 152,
    "type": "COMMUNE"
  },
  {
    "id": 252,
    "name": "GORBEA",
    "externalCode": "9107",
    "parentId": 142,
    "type": "COMMUNE"
  },
  {
    "id": 253,
    "name": "GRANEROS",
    "externalCode": "6106",
    "parentId": 145,
    "type": "COMMUNE"
  },
  {
    "id": 254,
    "name": "GUAITECAS",
    "externalCode": "11203",
    "parentId": 149,
    "type": "COMMUNE"
  },
  {
    "id": 255,
    "name": "HIJUELAS",
    "externalCode": "5503",
    "parentId": 144,
    "type": "COMMUNE"
  },
  {
    "id": 256,
    "name": "HUALAIHUE",
    "externalCode": "10403",
    "parentId": 148,
    "type": "COMMUNE"
  },
  {
    "id": 257,
    "name": "HUALAÑE",
    "externalCode": "7302",
    "parentId": 146,
    "type": "COMMUNE"
  },
  {
    "id": 258,
    "name": "HUALPEN",
    "externalCode": "8343",
    "parentId": 147,
    "type": "COMMUNE"
  },
  {
    "id": 259,
    "name": "HUALQUI",
    "externalCode": "8105",
    "parentId": 147,
    "type": "COMMUNE"
  },
  {
    "id": 260,
    "name": "HUARA",
    "externalCode": "1104",
    "parentId": 138,
    "type": "COMMUNE"
  },
  {
    "id": 261,
    "name": "HUASCO",
    "externalCode": "3304",
    "parentId": 140,
    "type": "COMMUNE"
  },
  {
    "id": 262,
    "name": "HUECHURABA",
    "externalCode": "13107",
    "parentId": 143,
    "type": "COMMUNE"
  },
  {
    "id": 263,
    "name": "ILLAPEL",
    "externalCode": "4201",
    "parentId": 141,
    "type": "COMMUNE"
  },
  {
    "id": 264,
    "name": "INDEPENDENCIA",
    "externalCode": "13108",
    "parentId": 143,
    "type": "COMMUNE"
  },
  {
    "id": 265,
    "name": "IQUIQUE",
    "externalCode": "1101",
    "parentId": 138,
    "type": "COMMUNE"
  },
  {
    "id": 266,
    "name": "ISLA DE MAIPO",
    "externalCode": "13603",
    "parentId": 143,
    "type": "COMMUNE"
  },
  {
    "id": 267,
    "name": "ISLA DE PASCUA",
    "externalCode": "5201",
    "parentId": 144,
    "type": "COMMUNE"
  },
  {
    "id": 268,
    "name": "JUAN FERNANDEZ",
    "externalCode": "5104",
    "parentId": 144,
    "type": "COMMUNE"
  },
  {
    "id": 269,
    "name": "LA CISTERNA",
    "externalCode": "13109",
    "parentId": 143,
    "type": "COMMUNE"
  },
  {
    "id": 270,
    "name": "LA CRUZ",
    "externalCode": "5504",
    "parentId": 144,
    "type": "COMMUNE"
  },
  {
    "id": 271,
    "name": "LA ESTRELLA",
    "externalCode": "6202",
    "parentId": 145,
    "type": "COMMUNE"
  },
  {
    "id": 272,
    "name": "LA FLORIDA",
    "externalCode": "13110",
    "parentId": 143,
    "type": "COMMUNE"
  },
  {
    "id": 273,
    "name": "LA GRANJA",
    "externalCode": "13111",
    "parentId": 143,
    "type": "COMMUNE"
  },
  {
    "id": 274,
    "name": "LA HIGUERA",
    "externalCode": "4104",
    "parentId": 141,
    "type": "COMMUNE"
  },
  {
    "id": 275,
    "name": "LA LIGUA",
    "externalCode": "5401",
    "parentId": 144,
    "type": "COMMUNE"
  },
  {
    "id": 276,
    "name": "LA PINTANA",
    "externalCode": "13112",
    "parentId": 143,
    "type": "COMMUNE"
  },
  {
    "id": 277,
    "name": "LA REINA",
    "externalCode": "13113",
    "parentId": 143,
    "type": "COMMUNE"
  },
  {
    "id": 278,
    "name": "LA SERENA",
    "externalCode": "4101",
    "parentId": 141,
    "type": "COMMUNE"
  },
  {
    "id": 279,
    "name": "LA UNION",
    "externalCode": "1403",
    "parentId": 151,
    "type": "COMMUNE"
  },
  {
    "id": 280,
    "name": "LAGO RANCO",
    "externalCode": "1404",
    "parentId": 151,
    "type": "COMMUNE"
  },
  {
    "id": 281,
    "name": "LAGO VERDE",
    "externalCode": "11102",
    "parentId": 149,
    "type": "COMMUNE"
  },
  {
    "id": 282,
    "name": "LAGUNA BLANCA",
    "externalCode": "12102",
    "parentId": 150,
    "type": "COMMUNE"
  },
  {
    "id": 283,
    "name": "LAJA",
    "externalCode": "8304",
    "parentId": 147,
    "type": "COMMUNE"
  },
  {
    "id": 284,
    "name": "LAMPA",
    "externalCode": "13302",
    "parentId": 143,
    "type": "COMMUNE"
  },
  {
    "id": 285,
    "name": "LANCO",
    "externalCode": "1405",
    "parentId": 151,
    "type": "COMMUNE"
  },
  {
    "id": 286,
    "name": "LAS CABRAS",
    "externalCode": "6107",
    "parentId": 145,
    "type": "COMMUNE"
  },
  {
    "id": 287,
    "name": "LAS CONDES",
    "externalCode": "13114",
    "parentId": 143,
    "type": "COMMUNE"
  },
  {
    "id": 288,
    "name": "LAUTARO",
    "externalCode": "9108",
    "parentId": 142,
    "type": "COMMUNE"
  },
  {
    "id": 289,
    "name": "LEBU",
    "externalCode": "8201",
    "parentId": 147,
    "type": "COMMUNE"
  },
  {
    "id": 290,
    "name": "LICANTEN",
    "externalCode": "7303",
    "parentId": 146,
    "type": "COMMUNE"
  },
  {
    "id": 291,
    "name": "LIMACHE",
    "externalCode": "5505",
    "parentId": 144,
    "type": "COMMUNE"
  },
  {
    "id": 292,
    "name": "LINARES",
    "externalCode": "7401",
    "parentId": 146,
    "type": "COMMUNE"
  },
  {
    "id": 293,
    "name": "LITUECHE",
    "externalCode": "6203",
    "parentId": 145,
    "type": "COMMUNE"
  },
  {
    "id": 294,
    "name": "LLAILLAY",
    "externalCode": "5703",
    "parentId": 144,
    "type": "COMMUNE"
  },
  {
    "id": 295,
    "name": "LLANQUIHUE",
    "externalCode": "10107",
    "parentId": 148,
    "type": "COMMUNE"
  },
  {
    "id": 296,
    "name": "LO BARNECHEA",
    "externalCode": "13115",
    "parentId": 143,
    "type": "COMMUNE"
  },
  {
    "id": 297,
    "name": "LO ESPEJO",
    "externalCode": "13116",
    "parentId": 143,
    "type": "COMMUNE"
  },
  {
    "id": 298,
    "name": "LO PRADO",
    "externalCode": "13117",
    "parentId": 143,
    "type": "COMMUNE"
  },
  {
    "id": 299,
    "name": "LOLOL",
    "externalCode": "6304",
    "parentId": 145,
    "type": "COMMUNE"
  },
  {
    "id": 300,
    "name": "LONCOCHE",
    "externalCode": "9109",
    "parentId": 142,
    "type": "COMMUNE"
  },
  {
    "id": 301,
    "name": "LONGAVI",
    "externalCode": "7403",
    "parentId": 146,
    "type": "COMMUNE"
  },
  {
    "id": 302,
    "name": "LONQUIMAY",
    "externalCode": "9205",
    "parentId": 142,
    "type": "COMMUNE"
  },
  {
    "id": 303,
    "name": "LOS ALAMOS",
    "externalCode": "8206",
    "parentId": 147,
    "type": "COMMUNE"
  },
  {
    "id": 304,
    "name": "LOS ANDES",
    "externalCode": "5301",
    "parentId": 144,
    "type": "COMMUNE"
  },
  {
    "id": 305,
    "name": "LOS ANGELES",
    "externalCode": "8301",
    "parentId": 147,
    "type": "COMMUNE"
  },
  {
    "id": 306,
    "name": "LOS LAGOS",
    "externalCode": "1406",
    "parentId": 151,
    "type": "COMMUNE"
  },
  {
    "id": 307,
    "name": "LOS MUERMOS",
    "externalCode": "10106",
    "parentId": 148,
    "type": "COMMUNE"
  },
  {
    "id": 308,
    "name": "LOS SAUCES",
    "externalCode": "9206",
    "parentId": 142,
    "type": "COMMUNE"
  },
  {
    "id": 309,
    "name": "LOS VILOS",
    "externalCode": "4203",
    "parentId": 141,
    "type": "COMMUNE"
  },
  {
    "id": 310,
    "name": "LOTA",
    "externalCode": "8106",
    "parentId": 147,
    "type": "COMMUNE"
  },
  {
    "id": 311,
    "name": "LUMACO",
    "externalCode": "9207",
    "parentId": 142,
    "type": "COMMUNE"
  },
  {
    "id": 312,
    "name": "MACHALI",
    "externalCode": "6108",
    "parentId": 145,
    "type": "COMMUNE"
  },
  {
    "id": 313,
    "name": "MACUL",
    "externalCode": "13118",
    "parentId": 143,
    "type": "COMMUNE"
  },
  {
    "id": 314,
    "name": "MAFIL",
    "externalCode": "1407",
    "parentId": 151,
    "type": "COMMUNE"
  },
  {
    "id": 315,
    "name": "MAIPU",
    "externalCode": "13119",
    "parentId": 143,
    "type": "COMMUNE"
  },
  {
    "id": 316,
    "name": "MALLOA",
    "externalCode": "6109",
    "parentId": 145,
    "type": "COMMUNE"
  },
  {
    "id": 317,
    "name": "MARCHIGUE",
    "externalCode": "6204",
    "parentId": 145,
    "type": "COMMUNE"
  },
  {
    "id": 318,
    "name": "MARIA ELENA",
    "externalCode": "2302",
    "parentId": 139,
    "type": "COMMUNE"
  },
  {
    "id": 319,
    "name": "MARIA PINTO",
    "externalCode": "13504",
    "parentId": 143,
    "type": "COMMUNE"
  },
  {
    "id": 320,
    "name": "MARIQUINA",
    "externalCode": "1408",
    "parentId": 151,
    "type": "COMMUNE"
  },
  {
    "id": 321,
    "name": "MAULE",
    "externalCode": "7105",
    "parentId": 146,
    "type": "COMMUNE"
  },
  {
    "id": 322,
    "name": "MAULLIN",
    "externalCode": "10108",
    "parentId": 148,
    "type": "COMMUNE"
  },
  {
    "id": 323,
    "name": "MEJILLONES",
    "externalCode": "2102",
    "parentId": 139,
    "type": "COMMUNE"
  },
  {
    "id": 324,
    "name": "MELIPEUCO",
    "externalCode": "9110",
    "parentId": 142,
    "type": "COMMUNE"
  },
  {
    "id": 325,
    "name": "MELIPILLA",
    "externalCode": "13501",
    "parentId": 143,
    "type": "COMMUNE"
  },
  {
    "id": 326,
    "name": "MOLINA",
    "externalCode": "7304",
    "parentId": 146,
    "type": "COMMUNE"
  },
  {
    "id": 327,
    "name": "MONTE PATRIA",
    "externalCode": "4303",
    "parentId": 141,
    "type": "COMMUNE"
  },
  {
    "id": 328,
    "name": "MOSTAZAL",
    "externalCode": "6110",
    "parentId": 145,
    "type": "COMMUNE"
  },
  {
    "id": 329,
    "name": "MULCHEN",
    "externalCode": "8305",
    "parentId": 147,
    "type": "COMMUNE"
  },
  {
    "id": 330,
    "name": "NACIMIENTO",
    "externalCode": "8306",
    "parentId": 147,
    "type": "COMMUNE"
  },
  {
    "id": 331,
    "name": "NANCAGUA",
    "externalCode": "6305",
    "parentId": 145,
    "type": "COMMUNE"
  },
  {
    "id": 332,
    "name": "NATALES",
    "externalCode": "12401",
    "parentId": 150,
    "type": "COMMUNE"
  },
  {
    "id": 333,
    "name": "NAVARINO",
    "externalCode": "12201",
    "parentId": 150,
    "type": "COMMUNE"
  },
  {
    "id": 334,
    "name": "NAVIDAD",
    "externalCode": "6205",
    "parentId": 145,
    "type": "COMMUNE"
  },
  {
    "id": 335,
    "name": "NEGRETE",
    "externalCode": "8307",
    "parentId": 147,
    "type": "COMMUNE"
  },
  {
    "id": 336,
    "name": "NINHUE",
    "externalCode": "8408",
    "parentId": 153,
    "type": "COMMUNE"
  },
  {
    "id": 337,
    "name": "NOGALES",
    "externalCode": "5506",
    "parentId": 144,
    "type": "COMMUNE"
  },
  {
    "id": 338,
    "name": "NUEVA IMPERIAL",
    "externalCode": "9111",
    "parentId": 142,
    "type": "COMMUNE"
  },
  {
    "id": 339,
    "name": "ÑIQUEN",
    "externalCode": "8409",
    "parentId": 153,
    "type": "COMMUNE"
  },
  {
    "id": 340,
    "name": "ÑUÑOA",
    "externalCode": "13120",
    "parentId": 143,
    "type": "COMMUNE"
  },
  {
    "id": 341,
    "name": "O HIGGINS",
    "externalCode": "11302",
    "parentId": 149,
    "type": "COMMUNE"
  },
  {
    "id": 342,
    "name": "OLIVAR",
    "externalCode": "6111",
    "parentId": 145,
    "type": "COMMUNE"
  },
  {
    "id": 343,
    "name": "OLLAGUE",
    "externalCode": "2202",
    "parentId": 139,
    "type": "COMMUNE"
  },
  {
    "id": 344,
    "name": "OLMUE",
    "externalCode": "5507",
    "parentId": 144,
    "type": "COMMUNE"
  },
  {
    "id": 345,
    "name": "OSORNO",
    "externalCode": "10301",
    "parentId": 148,
    "type": "COMMUNE"
  },
  {
    "id": 346,
    "name": "OVALLE",
    "externalCode": "4301",
    "parentId": 141,
    "type": "COMMUNE"
  },
  {
    "id": 347,
    "name": "PADRE HURTADO",
    "externalCode": "13604",
    "parentId": 143,
    "type": "COMMUNE"
  },
  {
    "id": 348,
    "name": "PADRE LAS CASAS",
    "externalCode": "9112",
    "parentId": 142,
    "type": "COMMUNE"
  },
  {
    "id": 349,
    "name": "PAIHUANO",
    "externalCode": "4105",
    "parentId": 141,
    "type": "COMMUNE"
  },
  {
    "id": 350,
    "name": "PAILLACO",
    "externalCode": "1409",
    "parentId": 151,
    "type": "COMMUNE"
  },
  {
    "id": 351,
    "name": "PAINE",
    "externalCode": "13404",
    "parentId": 143,
    "type": "COMMUNE"
  },
  {
    "id": 352,
    "name": "PALENA",
    "externalCode": "10404",
    "parentId": 148,
    "type": "COMMUNE"
  },
  {
    "id": 353,
    "name": "PALMILLA",
    "externalCode": "6306",
    "parentId": 145,
    "type": "COMMUNE"
  },
  {
    "id": 354,
    "name": "PANGUIPULLI",
    "externalCode": "1410",
    "parentId": 151,
    "type": "COMMUNE"
  },
  {
    "id": 355,
    "name": "PANQUEHUE",
    "externalCode": "5704",
    "parentId": 144,
    "type": "COMMUNE"
  },
  {
    "id": 356,
    "name": "PAPUDO",
    "externalCode": "5403",
    "parentId": 144,
    "type": "COMMUNE"
  },
  {
    "id": 357,
    "name": "PAREDONES",
    "externalCode": "6206",
    "parentId": 145,
    "type": "COMMUNE"
  },
  {
    "id": 358,
    "name": "PARRAL",
    "externalCode": "7404",
    "parentId": 146,
    "type": "COMMUNE"
  },
  {
    "id": 359,
    "name": "PEDRO AGUIRRE CERDA",
    "externalCode": "13121",
    "parentId": 143,
    "type": "COMMUNE"
  },
  {
    "id": 360,
    "name": "PELARCO",
    "externalCode": "7106",
    "parentId": 146,
    "type": "COMMUNE"
  },
  {
    "id": 361,
    "name": "PELLUHUE",
    "externalCode": "7203",
    "parentId": 146,
    "type": "COMMUNE"
  },
  {
    "id": 362,
    "name": "PEMUCO",
    "externalCode": "8410",
    "parentId": 153,
    "type": "COMMUNE"
  },
  {
    "id": 363,
    "name": "PENCAHUE",
    "externalCode": "7107",
    "parentId": 146,
    "type": "COMMUNE"
  },
  {
    "id": 364,
    "name": "PENCO",
    "externalCode": "8107",
    "parentId": 147,
    "type": "COMMUNE"
  },
  {
    "id": 365,
    "name": "PEÑAFLOR",
    "externalCode": "13605",
    "parentId": 143,
    "type": "COMMUNE"
  },
  {
    "id": 366,
    "name": "PEÑALOLEN",
    "externalCode": "13122",
    "parentId": 143,
    "type": "COMMUNE"
  },
  {
    "id": 367,
    "name": "PERALILLO",
    "externalCode": "6307",
    "parentId": 145,
    "type": "COMMUNE"
  },
  {
    "id": 368,
    "name": "PERQUENCO",
    "externalCode": "9113",
    "parentId": 142,
    "type": "COMMUNE"
  },
  {
    "id": 369,
    "name": "PETORCA",
    "externalCode": "5404",
    "parentId": 144,
    "type": "COMMUNE"
  },
  {
    "id": 370,
    "name": "PEUMO",
    "externalCode": "6112",
    "parentId": 145,
    "type": "COMMUNE"
  },
  {
    "id": 371,
    "name": "PICA",
    "externalCode": "1105",
    "parentId": 138,
    "type": "COMMUNE"
  },
  {
    "id": 372,
    "name": "PICHIDEGUA",
    "externalCode": "6113",
    "parentId": 145,
    "type": "COMMUNE"
  },
  {
    "id": 373,
    "name": "PICHILEMU",
    "externalCode": "6201",
    "parentId": 145,
    "type": "COMMUNE"
  },
  {
    "id": 374,
    "name": "PINTO",
    "externalCode": "8411",
    "parentId": 153,
    "type": "COMMUNE"
  },
  {
    "id": 375,
    "name": "PIRQUE",
    "externalCode": "13202",
    "parentId": 143,
    "type": "COMMUNE"
  },
  {
    "id": 376,
    "name": "PITRUFQUEN",
    "externalCode": "9114",
    "parentId": 142,
    "type": "COMMUNE"
  },
  {
    "id": 377,
    "name": "PLACILLA",
    "externalCode": "6308",
    "parentId": 145,
    "type": "COMMUNE"
  },
  {
    "id": 378,
    "name": "PORTEZUELO",
    "externalCode": "8412",
    "parentId": 153,
    "type": "COMMUNE"
  },
  {
    "id": 379,
    "name": "PORVENIR",
    "externalCode": "12301",
    "parentId": 150,
    "type": "COMMUNE"
  },
  {
    "id": 380,
    "name": "POZO ALMONTE",
    "externalCode": "1106",
    "parentId": 138,
    "type": "COMMUNE"
  },
  {
    "id": 381,
    "name": "PRIMAVERA",
    "externalCode": "12302",
    "parentId": 150,
    "type": "COMMUNE"
  },
  {
    "id": 382,
    "name": "PROVIDENCIA",
    "externalCode": "13123",
    "parentId": 143,
    "type": "COMMUNE"
  },
  {
    "id": 383,
    "name": "PUCHUNCAVI",
    "externalCode": "5105",
    "parentId": 144,
    "type": "COMMUNE"
  },
  {
    "id": 384,
    "name": "PUCON",
    "externalCode": "9115",
    "parentId": 142,
    "type": "COMMUNE"
  },
  {
    "id": 385,
    "name": "PUDAHUEL",
    "externalCode": "13124",
    "parentId": 143,
    "type": "COMMUNE"
  },
  {
    "id": 386,
    "name": "PUENTE ALTO",
    "externalCode": "13201",
    "parentId": 143,
    "type": "COMMUNE"
  },
  {
    "id": 387,
    "name": "PUERTO MONTT",
    "externalCode": "10101",
    "parentId": 148,
    "type": "COMMUNE"
  },
  {
    "id": 388,
    "name": "PUERTO OCTAY",
    "externalCode": "10302",
    "parentId": 148,
    "type": "COMMUNE"
  },
  {
    "id": 389,
    "name": "PUERTO VARAS",
    "externalCode": "10109",
    "parentId": 148,
    "type": "COMMUNE"
  },
  {
    "id": 390,
    "name": "PUMANQUE",
    "externalCode": "6309",
    "parentId": 145,
    "type": "COMMUNE"
  },
  {
    "id": 391,
    "name": "PUNITAQUI",
    "externalCode": "4304",
    "parentId": 141,
    "type": "COMMUNE"
  },
  {
    "id": 392,
    "name": "PUNTA ARENAS",
    "externalCode": "12101",
    "parentId": 150,
    "type": "COMMUNE"
  },
  {
    "id": 393,
    "name": "PUQUELDON",
    "externalCode": "10206",
    "parentId": 148,
    "type": "COMMUNE"
  },
  {
    "id": 394,
    "name": "PUREN",
    "externalCode": "9208",
    "parentId": 142,
    "type": "COMMUNE"
  },
  {
    "id": 395,
    "name": "PURRANQUE",
    "externalCode": "10303",
    "parentId": 148,
    "type": "COMMUNE"
  },
  {
    "id": 396,
    "name": "PUTAENDO",
    "externalCode": "5705",
    "parentId": 144,
    "type": "COMMUNE"
  },
  {
    "id": 397,
    "name": "PUTRE",
    "externalCode": "1504",
    "parentId": 152,
    "type": "COMMUNE"
  },
  {
    "id": 398,
    "name": "PUYEHUE",
    "externalCode": "10304",
    "parentId": 148,
    "type": "COMMUNE"
  },
  {
    "id": 399,
    "name": "QUEILEN",
    "externalCode": "10207",
    "parentId": 148,
    "type": "COMMUNE"
  },
  {
    "id": 400,
    "name": "QUELLON",
    "externalCode": "10208",
    "parentId": 148,
    "type": "COMMUNE"
  },
  {
    "id": 401,
    "name": "QUEMCHI",
    "externalCode": "10209",
    "parentId": 148,
    "type": "COMMUNE"
  },
  {
    "id": 402,
    "name": "QUILACO",
    "externalCode": "8308",
    "parentId": 147,
    "type": "COMMUNE"
  },
  {
    "id": 403,
    "name": "QUILICURA",
    "externalCode": "13125",
    "parentId": 143,
    "type": "COMMUNE"
  },
  {
    "id": 404,
    "name": "QUILLECO",
    "externalCode": "8309",
    "parentId": 147,
    "type": "COMMUNE"
  },
  {
    "id": 405,
    "name": "QUILLON",
    "externalCode": "8413",
    "parentId": 153,
    "type": "COMMUNE"
  },
  {
    "id": 406,
    "name": "QUILLOTA",
    "externalCode": "5501",
    "parentId": 144,
    "type": "COMMUNE"
  },
  {
    "id": 407,
    "name": "QUILPUE",
    "externalCode": "5106",
    "parentId": 144,
    "type": "COMMUNE"
  },
  {
    "id": 408,
    "name": "QUINCHAO",
    "externalCode": "10210",
    "parentId": 148,
    "type": "COMMUNE"
  },
  {
    "id": 409,
    "name": "QUINTA DE TILCOCO",
    "externalCode": "6114",
    "parentId": 145,
    "type": "COMMUNE"
  },
  {
    "id": 410,
    "name": "QUINTA NORMAL",
    "externalCode": "13126",
    "parentId": 143,
    "type": "COMMUNE"
  },
  {
    "id": 411,
    "name": "QUINTERO",
    "externalCode": "5107",
    "parentId": 144,
    "type": "COMMUNE"
  },
  {
    "id": 412,
    "name": "QUIRIHUE",
    "externalCode": "8414",
    "parentId": 153,
    "type": "COMMUNE"
  },
  {
    "id": 413,
    "name": "RANCAGUA",
    "externalCode": "6101",
    "parentId": 145,
    "type": "COMMUNE"
  },
  {
    "id": 414,
    "name": "RANQUIL",
    "externalCode": "8415",
    "parentId": 153,
    "type": "COMMUNE"
  },
  {
    "id": 415,
    "name": "RAUCO",
    "externalCode": "7305",
    "parentId": 146,
    "type": "COMMUNE"
  },
  {
    "id": 416,
    "name": "RECOLETA",
    "externalCode": "13127",
    "parentId": 143,
    "type": "COMMUNE"
  },
  {
    "id": 417,
    "name": "RENAICO",
    "externalCode": "9209",
    "parentId": 142,
    "type": "COMMUNE"
  },
  {
    "id": 418,
    "name": "RENCA",
    "externalCode": "13128",
    "parentId": 143,
    "type": "COMMUNE"
  },
  {
    "id": 419,
    "name": "RENGO",
    "externalCode": "6115",
    "parentId": 145,
    "type": "COMMUNE"
  },
  {
    "id": 420,
    "name": "REQUINOA",
    "externalCode": "6116",
    "parentId": 145,
    "type": "COMMUNE"
  },
  {
    "id": 421,
    "name": "RETIRO",
    "externalCode": "7405",
    "parentId": 146,
    "type": "COMMUNE"
  },
  {
    "id": 422,
    "name": "RINCONADA",
    "externalCode": "5303",
    "parentId": 144,
    "type": "COMMUNE"
  },
  {
    "id": 423,
    "name": "RIO BUENO",
    "externalCode": "1411",
    "parentId": 151,
    "type": "COMMUNE"
  },
  {
    "id": 424,
    "name": "RIO CLARO",
    "externalCode": "7108",
    "parentId": 146,
    "type": "COMMUNE"
  },
  {
    "id": 425,
    "name": "RIO HURTADO",
    "externalCode": "4305",
    "parentId": 141,
    "type": "COMMUNE"
  },
  {
    "id": 426,
    "name": "RIO IBAÑEZ",
    "externalCode": "11402",
    "parentId": 149,
    "type": "COMMUNE"
  },
  {
    "id": 427,
    "name": "RIO NEGRO",
    "externalCode": "10305",
    "parentId": 148,
    "type": "COMMUNE"
  },
  {
    "id": 428,
    "name": "RIO VERDE",
    "externalCode": "12103",
    "parentId": 150,
    "type": "COMMUNE"
  },
  {
    "id": 429,
    "name": "ROMERAL",
    "externalCode": "7306",
    "parentId": 146,
    "type": "COMMUNE"
  },
  {
    "id": 430,
    "name": "SAAVEDRA",
    "externalCode": "9116",
    "parentId": 142,
    "type": "COMMUNE"
  },
  {
    "id": 431,
    "name": "SAGRADA FAMILIA",
    "externalCode": "7307",
    "parentId": 146,
    "type": "COMMUNE"
  },
  {
    "id": 432,
    "name": "SALAMANCA",
    "externalCode": "4204",
    "parentId": 141,
    "type": "COMMUNE"
  },
  {
    "id": 433,
    "name": "SAN ANTONIO",
    "externalCode": "5601",
    "parentId": 144,
    "type": "COMMUNE"
  },
  {
    "id": 434,
    "name": "SAN BERNARDO",
    "externalCode": "13401",
    "parentId": 143,
    "type": "COMMUNE"
  },
  {
    "id": 435,
    "name": "SAN CARLOS",
    "externalCode": "8416",
    "parentId": 153,
    "type": "COMMUNE"
  },
  {
    "id": 436,
    "name": "SAN CLEMENTE",
    "externalCode": "7109",
    "parentId": 146,
    "type": "COMMUNE"
  },
  {
    "id": 437,
    "name": "SAN ESTEBAN",
    "externalCode": "5304",
    "parentId": 144,
    "type": "COMMUNE"
  },
  {
    "id": 438,
    "name": "SAN FABIAN",
    "externalCode": "8417",
    "parentId": 153,
    "type": "COMMUNE"
  },
  {
    "id": 439,
    "name": "SAN FELIPE",
    "externalCode": "5701",
    "parentId": 144,
    "type": "COMMUNE"
  },
  {
    "id": 440,
    "name": "SAN FERNANDO",
    "externalCode": "6301",
    "parentId": 145,
    "type": "COMMUNE"
  },
  {
    "id": 441,
    "name": "SAN GREGORIO",
    "externalCode": "12104",
    "parentId": 150,
    "type": "COMMUNE"
  },
  {
    "id": 442,
    "name": "SAN IGNACIO",
    "externalCode": "8418",
    "parentId": 153,
    "type": "COMMUNE"
  },
  {
    "id": 443,
    "name": "SAN JAVIER",
    "externalCode": "7406",
    "parentId": 146,
    "type": "COMMUNE"
  },
  {
    "id": 444,
    "name": "SAN JOAQUIN",
    "externalCode": "13129",
    "parentId": 143,
    "type": "COMMUNE"
  },
  {
    "id": 445,
    "name": "SAN JOSE DE MAIPO",
    "externalCode": "13203",
    "parentId": 143,
    "type": "COMMUNE"
  },
  {
    "id": 446,
    "name": "SAN JUAN DE LA COSTA",
    "externalCode": "10306",
    "parentId": 148,
    "type": "COMMUNE"
  },
  {
    "id": 447,
    "name": "SAN MIGUEL",
    "externalCode": "13130",
    "parentId": 143,
    "type": "COMMUNE"
  },
  {
    "id": 448,
    "name": "SAN NICOLAS",
    "externalCode": "8419",
    "parentId": 153,
    "type": "COMMUNE"
  },
  {
    "id": 449,
    "name": "SAN PABLO",
    "externalCode": "10307",
    "parentId": 148,
    "type": "COMMUNE"
  },
  {
    "id": 450,
    "name": "SAN PEDRO",
    "externalCode": "13505",
    "parentId": 143,
    "type": "COMMUNE"
  },
  {
    "id": 451,
    "name": "SAN PEDRO DE ATACAMA",
    "externalCode": "2203",
    "parentId": 139,
    "type": "COMMUNE"
  },
  {
    "id": 452,
    "name": "SAN PEDRO DE LA PAZ",
    "externalCode": "8108",
    "parentId": 147,
    "type": "COMMUNE"
  },
  {
    "id": 453,
    "name": "SAN RAFAEL",
    "externalCode": "7110",
    "parentId": 146,
    "type": "COMMUNE"
  },
  {
    "id": 454,
    "name": "SAN RAMON",
    "externalCode": "13131",
    "parentId": 143,
    "type": "COMMUNE"
  },
  {
    "id": 455,
    "name": "SAN ROSENDO",
    "externalCode": "8310",
    "parentId": 147,
    "type": "COMMUNE"
  },
  {
    "id": 456,
    "name": "SAN VICENTE",
    "externalCode": "6117",
    "parentId": 145,
    "type": "COMMUNE"
  },
  {
    "id": 457,
    "name": "SANTA BARBARA",
    "externalCode": "8311",
    "parentId": 147,
    "type": "COMMUNE"
  },
  {
    "id": 458,
    "name": "SANTA CRUZ",
    "externalCode": "6310",
    "parentId": 145,
    "type": "COMMUNE"
  },
  {
    "id": 459,
    "name": "SANTA JUANA",
    "externalCode": "8109",
    "parentId": 147,
    "type": "COMMUNE"
  },
  {
    "id": 460,
    "name": "SANTA MARIA",
    "externalCode": "5706",
    "parentId": 144,
    "type": "COMMUNE"
  },
  {
    "id": 461,
    "name": "SANTIAGO",
    "externalCode": "13101",
    "parentId": 143,
    "type": "COMMUNE"
  },
  {
    "id": 462,
    "name": "SANTO DOMINGO",
    "externalCode": "5606",
    "parentId": 144,
    "type": "COMMUNE"
  },
  {
    "id": 463,
    "name": "SIERRA GORDA",
    "externalCode": "2103",
    "parentId": 139,
    "type": "COMMUNE"
  },
  {
    "id": 464,
    "name": "TALAGANTE",
    "externalCode": "13601",
    "parentId": 143,
    "type": "COMMUNE"
  },
  {
    "id": 465,
    "name": "TALCA",
    "externalCode": "7101",
    "parentId": 146,
    "type": "COMMUNE"
  },
  {
    "id": 466,
    "name": "TALCAHUANO",
    "externalCode": "8110",
    "parentId": 147,
    "type": "COMMUNE"
  },
  {
    "id": 467,
    "name": "TALTAL",
    "externalCode": "2104",
    "parentId": 139,
    "type": "COMMUNE"
  },
  {
    "id": 468,
    "name": "TEMUCO",
    "externalCode": "9101",
    "parentId": 142,
    "type": "COMMUNE"
  },
  {
    "id": 469,
    "name": "TENO",
    "externalCode": "7308",
    "parentId": 146,
    "type": "COMMUNE"
  },
  {
    "id": 470,
    "name": "TEODORO SCHMIDT",
    "externalCode": "9117",
    "parentId": 142,
    "type": "COMMUNE"
  },
  {
    "id": 471,
    "name": "TIERRA AMARILLA",
    "externalCode": "3103",
    "parentId": 140,
    "type": "COMMUNE"
  },
  {
    "id": 472,
    "name": "TILTIL",
    "externalCode": "13303",
    "parentId": 143,
    "type": "COMMUNE"
  },
  {
    "id": 473,
    "name": "TIMAUKEL",
    "externalCode": "12303",
    "parentId": 150,
    "type": "COMMUNE"
  },
  {
    "id": 474,
    "name": "TIRUA",
    "externalCode": "8207",
    "parentId": 147,
    "type": "COMMUNE"
  },
  {
    "id": 475,
    "name": "TOCOPILLA",
    "externalCode": "2301",
    "parentId": 139,
    "type": "COMMUNE"
  },
  {
    "id": 476,
    "name": "TOLTEN",
    "externalCode": "9118",
    "parentId": 142,
    "type": "COMMUNE"
  },
  {
    "id": 477,
    "name": "TOME",
    "externalCode": "8111",
    "parentId": 147,
    "type": "COMMUNE"
  },
  {
    "id": 478,
    "name": "TORRES DEL PAINE",
    "externalCode": "12402",
    "parentId": 150,
    "type": "COMMUNE"
  },
  {
    "id": 479,
    "name": "TORTEL",
    "externalCode": "11303",
    "parentId": 149,
    "type": "COMMUNE"
  },
  {
    "id": 480,
    "name": "TRAIGUEN",
    "externalCode": "9210",
    "parentId": 142,
    "type": "COMMUNE"
  },
  {
    "id": 481,
    "name": "TREGUACO",
    "externalCode": "8420",
    "parentId": 153,
    "type": "COMMUNE"
  },
  {
    "id": 482,
    "name": "TUCAPEL",
    "externalCode": "8312",
    "parentId": 147,
    "type": "COMMUNE"
  },
  {
    "id": 483,
    "name": "VALDIVIA",
    "externalCode": "1412",
    "parentId": 151,
    "type": "COMMUNE"
  },
  {
    "id": 484,
    "name": "VALLENAR",
    "externalCode": "3301",
    "parentId": 140,
    "type": "COMMUNE"
  },
  {
    "id": 485,
    "name": "VALPARAISO",
    "externalCode": "5101",
    "parentId": 144,
    "type": "COMMUNE"
  },
  {
    "id": 486,
    "name": "VICHUQUEN",
    "externalCode": "7309",
    "parentId": 146,
    "type": "COMMUNE"
  },
  {
    "id": 487,
    "name": "VICTORIA",
    "externalCode": "9211",
    "parentId": 142,
    "type": "COMMUNE"
  },
  {
    "id": 488,
    "name": "VICUÑA",
    "externalCode": "4106",
    "parentId": 141,
    "type": "COMMUNE"
  },
  {
    "id": 489,
    "name": "VILCUN",
    "externalCode": "9119",
    "parentId": 142,
    "type": "COMMUNE"
  },
  {
    "id": 490,
    "name": "VILLA ALEGRE",
    "externalCode": "7407",
    "parentId": 146,
    "type": "COMMUNE"
  },
  {
    "id": 491,
    "name": "VILLA ALEMANA",
    "externalCode": "5108",
    "parentId": 144,
    "type": "COMMUNE"
  },
  {
    "id": 492,
    "name": "VILLARRICA",
    "externalCode": "9120",
    "parentId": 142,
    "type": "COMMUNE"
  },
  {
    "id": 493,
    "name": "VIÑA DEL MAR",
    "externalCode": "5109",
    "parentId": 144,
    "type": "COMMUNE"
  },
  {
    "id": 494,
    "name": "VITACURA",
    "externalCode": "13132",
    "parentId": 143,
    "type": "COMMUNE"
  },
  {
    "id": 495,
    "name": "YERBAS BUENAS",
    "externalCode": "7408",
    "parentId": 146,
    "type": "COMMUNE"
  },
  {
    "id": 496,
    "name": "YUMBEL",
    "externalCode": "8313",
    "parentId": 147,
    "type": "COMMUNE"
  },
  {
    "id": 497,
    "name": "YUNGAY",
    "externalCode": "8421",
    "parentId": 153,
    "type": "COMMUNE"
  },
  {
    "id": 498,
    "name": "ZAPALLAR",
    "externalCode": "5405",
    "parentId": 144,
    "type": "COMMUNE"
  },
  {
    "id": 499,
    "name": "DNI",
    "externalCode": "1",
    "parentId": 0,
    "type": "IDENTIFICATION_TYPE"
  },
  {
    "id": 500,
    "name": "RUC",
    "externalCode": "6",
    "parentId": 0,
    "type": "IDENTIFICATION_TYPE"
  },
  {
    "id": 501,
    "name": "CE",
    "externalCode": "3",
    "parentId": 0,
    "type": "IDENTIFICATION_TYPE"
  },
  {
    "id": 502,
    "name": "ABN AMRO BANCK",
    "externalCode": "11",
    "parentId": 136,
    "type": "BANKS"
  },
  {
    "id": 503,
    "name": "BANCO BANKBOSTON",
    "externalCode": "10",
    "parentId": 136,
    "type": "BANKS"
  },
  {
    "id": 504,
    "name": "BANCO BBVA",
    "externalCode": "14",
    "parentId": 136,
    "type": "BANKS"
  },
  {
    "id": 505,
    "name": "BANCO BICE",
    "externalCode": "6",
    "parentId": 136,
    "type": "BANKS"
  },
  {
    "id": 506,
    "name": "BANCO CITIBANK",
    "externalCode": "8",
    "parentId": 136,
    "type": "BANKS"
  },
  {
    "id": 507,
    "name": "BANCO CONOSUR",
    "externalCode": "25",
    "parentId": 136,
    "type": "BANKS"
  },
  {
    "id": 508,
    "name": "BANCO CORPBANCA",
    "externalCode": "5",
    "parentId": 136,
    "type": "BANKS"
  },
  {
    "id": 509,
    "name": "BANCO CREDITO E INVERSIONES",
    "externalCode": "4",
    "parentId": 136,
    "type": "BANKS"
  },
  {
    "id": 510,
    "name": "BANCO DE CHILE",
    "externalCode": "1",
    "parentId": 136,
    "type": "BANKS"
  },
  {
    "id": 511,
    "name": "BANCO DE LA NACION ARGENTINA",
    "externalCode": "28",
    "parentId": 136,
    "type": "BANKS"
  },
  {
    "id": 512,
    "name": "BANCO DEL DESARROLLO",
    "externalCode": "12",
    "parentId": 136,
    "type": "BANKS"
  },
  {
    "id": 513,
    "name": "BANCO DO BRASIL S.A.",
    "externalCode": "26",
    "parentId": 136,
    "type": "BANKS"
  },
  {
    "id": 514,
    "name": "BANCO ESTADO",
    "externalCode": "2",
    "parentId": 136,
    "type": "BANKS"
  },
  {
    "id": 515,
    "name": "BANCO FALABELLA",
    "externalCode": "18",
    "parentId": 136,
    "type": "BANKS"
  },
  {
    "id": 516,
    "name": "BANCO INTERNACIONAL",
    "externalCode": "16",
    "parentId": 136,
    "type": "BANKS"
  },
  {
    "id": 517,
    "name": "BANCO MONEX",
    "externalCode": "22",
    "parentId": 136,
    "type": "BANKS"
  },
  {
    "id": 518,
    "name": "BANCO PARIS",
    "externalCode": "24",
    "parentId": 136,
    "type": "BANKS"
  },
  {
    "id": 519,
    "name": "BANCO PENTA",
    "externalCode": "23",
    "parentId": 136,
    "type": "BANKS"
  },
  {
    "id": 520,
    "name": "BANCO RIPLEY",
    "externalCode": "20",
    "parentId": 136,
    "type": "BANKS"
  },
  {
    "id": 521,
    "name": "BANCO SANTANDER SANTIAGO",
    "externalCode": "9",
    "parentId": 136,
    "type": "BANKS"
  },
  {
    "id": 522,
    "name": "BANCO SCOTIABANK",
    "externalCode": "3",
    "parentId": 136,
    "type": "BANKS"
  },
  {
    "id": 523,
    "name": "BANCO SECURITY",
    "externalCode": "13",
    "parentId": 136,
    "type": "BANKS"
  },
  {
    "id": 524,
    "name": "DEUTSCHE BANK(CHILE)",
    "externalCode": "19",
    "parentId": 136,
    "type": "BANKS"
  },
  {
    "id": 525,
    "name": "HNS BANCO",
    "externalCode": "21",
    "parentId": 136,
    "type": "BANKS"
  },
  {
    "id": 526,
    "name": "HSBC BANK CHILE",
    "externalCode": "17",
    "parentId": 136,
    "type": "BANKS"
  },
  {
    "id": 527,
    "name": "JP MORGAN CHASE BANK, NATIONAL ASSOCIATION",
    "externalCode": "27",
    "parentId": 136,
    "type": "BANKS"
  },
  {
    "id": 528,
    "name": "OTRAS INSTITUCIONES",
    "externalCode": "15",
    "parentId": 136,
    "type": "BANKS"
  },
  {
    "id": 529,
    "name": "THE BANK OF TOKYO - MITSUBISHI, LTD",
    "externalCode": "29",
    "parentId": 136,
    "type": "BANKS"
  }
]

module.exports = {
  async up(db) {
    db.collection('CoreParams').insertMany(coreParams);
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  }
};
