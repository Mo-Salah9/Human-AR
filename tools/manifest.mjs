// Maps app part IDs -> BodyParts3D FMA mesh files.
// `l` / `r` = left / right variants (become `<key>_l` / `<key>_r`); `c` = central (single) part.
// `tris` = triangle budget for the whole part after simplification (tablet friendly).
export const MANIFEST = {
  // ------------------------------------------------------------------ SKIN
  skin: { sys: 'skin', c: [7163], tris: 70000 },

  // ------------------------------------------------------------------ SKELETON
  skull: { sys: 'skeletal', tris: 26000, c: [52734, 52789, 52788, 52735, 52739, 52738, 52736, 52740, 53650, 53649, 52893, 52892, 53648, 53647, 53646, 53645, 53656, 53655, 9710] },
  mandible: { sys: 'skeletal', c: [52748], tris: 5000 },
  cervical_spine: { sys: 'skeletal', tris: 12000, c: [12519, 12520, 12521, 12522, 12523, 12524, 12525, 25058, 13896, 13897, 13898, 13899, 13900] },
  thoracic_spine: { sys: 'skeletal', tris: 22000, c: [9165, 9187, 9209, 9248, 9922, 9945, 9968, 9991, 10014, 10037, 10059, 10081, 10458, 13495, 13500, 13501, 13502, 13503, 13504, 13505, 13506, 13507, 13508, 13509] },
  lumbar_spine: { sys: 'skeletal', tris: 14000, c: [13072, 13073, 13074, 13075, 13076, 16033, 16034, 16035, 16036, 16037] },
  sacrum: { sys: 'skeletal', c: [16202], tris: 6000 },
  ribs: { sys: 'skeletal', tris: 30000, c: [
    7987, 8012, 8039, 8148, 8093, 8202, 8256, 8310, 8391, 8472, 8532, 8534,
    7857, 7882, 7909, 7957, 8066, 8175, 8229, 8283, 8364, 8445, 8531, 8533,
    8005, 8031, 8058, 8167, 8112, 8221, 8275, 7875, 7886, 7913, 7976, 8070, 8194, 8248] },
  sternum: { sys: 'skeletal', c: [7486, 7487, 7488], tris: 4000 },
  clavicle: { sys: 'skeletal', l: [13323], r: [13322], tris: 2500 },
  scapula: { sys: 'skeletal', l: [13396], r: [13395], tris: 7000 },
  humerus: { sys: 'skeletal', l: [23131], r: [23130], tris: 5000 },
  radius: { sys: 'skeletal', l: [23465], r: [23464], tris: 2500 },
  ulna: { sys: 'skeletal', l: [23468], r: [23467], tris: 2500 },
  hand: { sys: 'skeletal', tris: 9000,
    l: [24436, 24438, 24440, 24442, 24444, 24445, 24447, 24449, 24465, 24467, 24469, 24471, 24473, 65470, 71915, 71908, 71916, 66791, 23938, 23940, 23942, 23944, 23951, 23953, 23955, 23957, 23959],
    r: [24435, 24437, 24439, 24441, 24443, 23725, 24446, 24448, 24464, 24466, 24468, 24470, 24472, 24450, 24451, 24452, 24453, 24454, 24455, 24456, 24457, 24458, 24459, 24460, 24461, 24462, 24463] },
  pelvis: { sys: 'skeletal', c: [16587, 16586], tris: 9000 },
  femur: { sys: 'skeletal', l: [24475], r: [24474], tris: 5000 },
  patella: { sys: 'skeletal', l: [24487], r: [24486], tris: 1200 },
  tibia: { sys: 'skeletal', l: [24478], r: [24477], tris: 4000 },
  fibula: { sys: 'skeletal', l: [24481], r: [24480], tris: 2500 },
  foot: { sys: 'skeletal', tris: 9000,
    l: [24483, 24498, 24501, 24529, 24522, 24524, 24526, 24508, 24510, 24512, 24514, 24516, 43254, 32635, 32637, 32639, 32641, 32643, 32645, 32647, 230988, 32651, 32653, 32655, 32657, 32659],
    r: [24482, 24497, 24500, 24528, 24521, 24523, 24525, 24507, 24509, 24511, 24513, 24515, 43253, 32634, 32636, 32638, 32640, 32642, 32644, 32646, 230986, 32650, 32652, 32654, 32656, 32658] },

  // ------------------------------------------------------------------ MUSCLES
  sternocleidomastoid: { sys: 'muscular', l: [13409], r: [13408], tris: 3000 },
  trapezius: { sys: 'muscular', l: [33583, 33587, 33585], r: [33581, 33586, 33584], tris: 7000 },
  deltoid: { sys: 'muscular', l: [34683, 34681, 34685], r: [34682, 34680, 34684], tris: 6000 },
  pectoralis_major: { sys: 'muscular', l: [45875, 34691, 79980], r: [45874, 34690, 79979], tris: 5000 },
  biceps: { sys: 'muscular', l: [37687, 37685], r: [37686, 37684], tris: 4000 },
  brachialis: { sys: 'muscular', l: [37669, 37666], r: [37668, 37665], tris: 3000 },
  triceps: { sys: 'muscular', l: [37698, 37700, 37696], r: [37697, 37699, 37695], tris: 5000 },
  forearm_muscles: { sys: 'muscular', tris: 12000,
    l: [38487, 38618, 38620, 38561, 38563, 38461, 38639, 38496, 38499, 38502, 38505, 38526, 38520, 38523],
    r: [38486, 38617, 38619, 38560, 38562, 38460, 38638, 38495, 38498, 38501, 38504, 38525, 38519, 38522] },
  rotator_cuff: { sys: 'muscular', l: [32545, 32548, 32554, 13415, 32552], r: [32544, 32547, 32553, 13414, 32551], tris: 6000 },
  serratus_anterior: { sys: 'muscular', l: [13399], r: [13398], tris: 6000 },
  rectus_abdominis: { sys: 'muscular', l: [13378], r: [13377], tris: 5000 },
  external_oblique: { sys: 'muscular', l: [13337], r: [13336], tris: 7000 },
  latissimus_dorsi: { sys: 'muscular', l: [13359], r: [13358], tris: 7000 },
  iliopsoas: { sys: 'muscular', l: [22343, 22323], r: [22342, 22322], tris: 4000 },
  gluteus_maximus: { sys: 'muscular', l: [22329], r: [22328], tris: 4000 },
  gluteus_medius: { sys: 'muscular', l: [22331, 22333, 22426], r: [22330, 22332, 22425], tris: 4500 },
  sartorius: { sys: 'muscular', l: [22355], r: [22354], tris: 2500 },
  quadriceps: { sys: 'muscular', l: [38929, 38931, 38933, 38935], r: [38928, 38930, 38932, 38934], tris: 9000 },
  adductors: { sys: 'muscular', l: [22454, 22457, 22460, 43887], r: [22452, 22456, 22459, 43886], tris: 6000 },
  hamstrings: { sys: 'muscular', l: [45889, 45892, 22359, 22449], r: [45888, 45891, 22358, 22448], tris: 7000 },
  gastrocnemius: { sys: 'muscular', l: [45961, 45958], r: [45960, 45957], tris: 5000 },
  soleus: { sys: 'muscular', l: [22559], r: [22558], tris: 3500 },
  tibialis_anterior: { sys: 'muscular', l: [22545, 22549, 22547], r: [22544, 22548, 22546], tris: 4500 },

  // ------------------------------------------------------------------ NERVOUS
  frontal_lobe: { sys: 'nervous', l: [72654, 72656, 72662], r: [72653, 72655, 72661], tris: 9000 },
  parietal_lobe: { sys: 'nervous', l: [72666, 72668, 72670], r: [72665, 72667, 72669], tris: 7000 },
  temporal_lobe: { sys: 'nervous', l: [72801, 72805, 72686, 72688, 72690], r: [72800, 72804, 72685, 72687, 72689], tris: 8000 },
  occipital_lobe: { sys: 'nervous', l: [72976], r: [72975], tris: 3500 },
  insula: { sys: 'nervous', l: [72978, 72702], r: [72977, 72701], tris: 2500 },
  limbic_system: { sys: 'nervous', l: [72718, 72706, 72714, 72833, 72925], r: [72717, 72705, 72713, 72832, 72924], tris: 5000 },
  cerebrum: { sys: 'nervous', c: [61822], tris: 14000 },
  corpus_callosum: { sys: 'nervous', c: [86464], tris: 5000 },
  thalamus: { sys: 'nervous', l: [258716], r: [258714], tris: 1500 },
  ventricles: { sys: 'nervous', c: [78450, 78449, 78454, 78467, 78469], tris: 6000 },
  cerebellum: { sys: 'nervous', c: [67944], tris: 16000 },
  brainstem: { sys: 'nervous', c: [61993, 67943, 62004], tris: 8000 },
  eye: { sys: 'nervous', c: [12513], split: true, extra: { l: [50878], r: [50875] }, tris: 3000 },

  // ------------------------------------------------------------------ RESPIRATORY
  larynx: { sys: 'respiratory', c: [55099, 52749], tris: 4000 },
  trachea: { sys: 'respiratory', c: [7394], tris: 5000 },
  bronchi: { sys: 'respiratory', c: [7409], tris: 14000 },
  lung_r: { sys: 'respiratory', c: [7333, 7383, 7337], tris: 16000 },
  lung_l: { sys: 'respiratory', c: [7370, 7371], tris: 14000 },
  diaphragm: { sys: 'respiratory', c: [13295], tris: 9000 },

  // ------------------------------------------------------------------ CIRCULATORY
  heart: { sys: 'circulatory', c: [7274], tris: 30000 },
  coronary_arteries: { sys: 'circulatory', c: [3802, 4685, 3862, 3895, 71670, 71669, 4707, 4713, 4706, 71567, 76751], tris: 6000 },
  pulmonary_vessels: { sys: 'circulatory', c: [66326, 66643], tris: 12000 },
  aorta: { sys: 'circulatory', c: [3736, 3768, 3784, 3932, 50737, 14749, 14750, 14753, 14752, 14771, 14768, 14773], tris: 9000 },
  vena_cava: { sys: 'circulatory', c: [4720, 10951, 4761, 4751, 14336, 14335, 14331, 14332, 21388, 21387, 18886, 18885, 18888, 18887, 4762, 4754, 4763, 4755], tris: 8000 },
  carotid: { sys: 'circulatory', l: [4058], r: [3941], tris: 1200 },
  brachial_artery: { sys: 'circulatory', l: [4694], r: [3953], tris: 1500, procExtend: 'arm' },
  femoral_artery: { sys: 'circulatory', l: [14766, 18807, 18810], r: [14765, 18806, 18809], tris: 1500, procExtend: 'leg' },
  spleen: { sys: 'circulatory', c: [7196], tris: 4000 },
  thymus: { sys: 'endocrine', c: [71195, 71194], tris: 4000 },

  // ------------------------------------------------------------------ DIGESTIVE
  esophagus: { sys: 'digestive', c: [7131], tris: 2500 },
  stomach: { sys: 'digestive', c: [7148], tris: 6000 },
  liver: { sys: 'digestive', c: [7197], tris: 12000 },
  gallbladder: { sys: 'digestive', c: [7202], tris: 3000 },
  pancreas: { sys: 'digestive', c: [7198], tris: 5000 },
  small_intestine: { sys: 'digestive', c: [7206, 7207, 7208], tris: 20000 },
  large_intestine: { sys: 'digestive', c: [14543, 14544], tris: 16000 },
  appendix: { sys: 'digestive', c: [14542], tris: 600 },

  // ------------------------------------------------------------------ URINARY & ENDOCRINE
  kidney: { sys: 'urinary', l: [7205], r: [7204], tris: 5000 },
  ureter: { sys: 'urinary', l: [15572], r: [15571], tris: 1200 },
  bladder: { sys: 'urinary', c: [15900], tris: 2500 },
  adrenal: { sys: 'endocrine', l: [15630], r: [15629], tris: 2500 },
  pituitary: { sys: 'endocrine', c: [13889], tris: 1500 },
};

// Parts not present in BodyParts3D v3 — generated procedurally from real landmarks by the build script
export const PROCEDURAL = ['spinal_cord', 'sciatic_nerve', 'median_nerve', 'thyroid'];
