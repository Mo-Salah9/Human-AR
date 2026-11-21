// =====================================================================
//  Anatomy content (Arabic / English) — aimed at first-year medical students
// =====================================================================

// layer: 1 = skin, 2 = muscles, 3 = skeleton, 4 = superficial organs, 5 = deep organs
export const SYSTEMS = {
  skin:        { ar: 'الجهاز اللحافي (الجلد)', en: 'Integumentary (Skin)', color: '#e8b896', layer: 1, opacity: 0.35 },
  muscular:    { ar: 'الجهاز العضلي',           en: 'Muscular system',       color: '#c0453f', layer: 2, opacity: 1 },
  skeletal:    { ar: 'الجهاز الهيكلي',          en: 'Skeletal system',       color: '#efe6cf', layer: 3, opacity: 1 },
  nervous:     { ar: 'الجهاز العصبي',           en: 'Nervous system',        color: '#f4d35e', layer: 5, opacity: 1 },
  respiratory: { ar: 'الجهاز التنفسي',          en: 'Respiratory system',    color: '#f08a9b', layer: 5, opacity: 1 },
  circulatory: { ar: 'الجهاز الدوري',           en: 'Circulatory system',    color: '#d32f2f', layer: 5, opacity: 1 },
  digestive:   { ar: 'الجهاز الهضمي',           en: 'Digestive system',      color: '#d98c6a', layer: 5, opacity: 1 },
  urinary:     { ar: 'الجهاز البولي',           en: 'Urinary system',        color: '#e0b060', layer: 5, opacity: 1 },
  endocrine:   { ar: 'الجهاز الغدّي الصمّي',     en: 'Endocrine system',      color: '#9c6ade', layer: 5, opacity: 1 },
};

export const LAYER_NAMES = {
  ar: ['الجلد', 'العضلات', 'الهيكل العظمي', 'الأعضاء السطحية', 'الأعضاء العميقة'],
  en: ['Skin', 'Muscles', 'Skeleton', 'Superficial organs', 'Deep organs'],
};

export const PEEL_LEVELS = {
  ar: ['كل الطبقات', 'بدون الجلد', 'بدون العضلات', 'الأعضاء فقط', 'الأعضاء العميقة'],
  en: ['All layers', 'Skin removed', 'Muscles removed', 'Organs only', 'Deep organs'],
};

export const PARTS = {
  // ------------------------------------------------------------------ SKIN
  skin: {
    sys: 'skin', latin: 'Cutis / Integumentum commune',
    name: { ar: 'الجلد', en: 'Skin' },
    desc: {
      ar: `أكبر عضو في جسم الإنسان؛ تبلغ مساحته نحو 1.5–2 م² ويشكّل قرابة 16% من وزن الجسم. يتكوّن من ثلاث طبقات: البشرة (Epidermis) وهي نسيج طلائي حرشفي مطبّق متقرّن بلا أوعية دموية، ثم الأدمة (Dermis) الغنية بالألياف الكولاجينية والأوعية والأعصاب وبصيلات الشعر والغدد العرقية والدهنية، وأخيراً تحت الأدمة (Hypodermis) المكوّنة أساساً من النسيج الدهني.`,
      en: `The largest organ of the body (≈1.5–2 m², ~16% of body weight). It has three layers: the epidermis — an avascular keratinised stratified squamous epithelium; the dermis — collagen-rich connective tissue containing vessels, nerves, hair follicles, sweat and sebaceous glands; and the hypodermis (subcutaneous tissue), mostly adipose tissue.`,
    },
    func: {
      ar: `حاجز وقائي ضد الميكروبات والأشعة فوق البنفسجية وفقدان الماء، تنظيم حرارة الجسم بالتعرّق وتوسّع/تضيّق الأوعية، الإحساس باللمس والضغط والألم والحرارة، تصنيع فيتامين D بفعل أشعة الشمس، والمساهمة في المناعة (خلايا لانغرهانس).`,
      en: `Protective barrier against microbes, UV radiation and water loss; thermoregulation through sweating and vasodilation/vasoconstriction; sensation (touch, pressure, pain, temperature); vitamin D synthesis; immune surveillance (Langerhans cells).`,
    },
    clin: {
      ar: `تُصنّف الحروق حسب العمق (سطحية، جزئية السماكة، كاملة السماكة)، وتُقدَّر مساحتها بـ"قاعدة التسعات". الورم الميلانيني (Melanoma) أخطر سرطانات الجلد، ويُقيَّم بقاعدة ABCDE (عدم التناظر، الحواف، اللون، القطر، التطوّر).`,
      en: `Burns are classified by depth (superficial, partial-thickness, full-thickness) and their extent estimated with the "rule of nines". Melanoma is the most dangerous skin cancer; suspicious moles are assessed with ABCDE (Asymmetry, Border, Colour, Diameter, Evolution).`,
    },
    facts: {
      ar: ['تتجدد البشرة كاملة كل 4 أسابيع تقريباً.', 'خطوط لانغر (Langer lines) تحدّد اتجاه ألياف الكولاجين، والشقوق الجراحية الموازية لها تلتئم بندبة أقل.'],
      en: ['The epidermis renews itself roughly every 4 weeks.', 'Incisions made parallel to Langer’s lines (collagen orientation) heal with smaller scars.'],
    },
  },

  // ------------------------------------------------------------------ SKELETAL
  skull: {
    sys: 'skeletal', latin: 'Cranium',
    name: { ar: 'الجمجمة', en: 'Skull' },
    desc: {
      ar: `تتكوّن من 22 عظمة: 8 عظام قحفية (الجبهي، الجداريان، الصدغيان، القذالي، الوتدي، الغربالي) تحيط بالدماغ، و14 عظمة وجهية. ترتبط العظام بمفاصل ليفية ثابتة تُسمّى الدروز (Sutures) مثل الدرز الإكليلي والسهمي واللامي.`,
      en: `Made of 22 bones: 8 cranial bones (frontal, 2 parietal, 2 temporal, occipital, sphenoid, ethmoid) enclosing the brain, and 14 facial bones. They are joined by immovable fibrous joints called sutures (coronal, sagittal, lambdoid).`,
    },
    func: {
      ar: `حماية الدماغ وأعضاء الحواس الخاصة (العين والأذن والأنف واللسان)، وتشكيل هيكل الوجه، ومنشأ لعضلات المضغ وتعابير الوجه، وتحتوي ثقوباً لمرور الأعصاب القحفية والأوعية (مثل الثقبة العظمى).`,
      en: `Protects the brain and special sense organs, forms the facial framework, provides attachment for muscles of mastication and facial expression, and contains foramina for cranial nerves and vessels (e.g. foramen magnum).`,
    },
    clin: {
      ar: `اليوافيخ (Fontanelles) عند الرضّع: الأمامي يُغلق بعمر 18–24 شهراً تقريباً. نقطة التيريون (Pterion) أرقّ مناطق الجمجمة ويمر تحتها الشريان السحائي الأوسط؛ كسرها قد يسبّب ورماً دموياً فوق الجافية. علامات كسر قاعدة الجمجمة: عيون الراكون وعلامة باتل وتسرّب السائل الدماغي من الأنف.`,
      en: `Infant fontanelles: the anterior one closes at ~18–24 months. The pterion is the thinnest part of the skull and overlies the middle meningeal artery — fracture here can cause an extradural haematoma. Basal skull fracture signs: raccoon eyes, Battle’s sign, CSF rhinorrhoea.`,
    },
    facts: {
      ar: ['الفك السفلي هو العظم الوحيد المتحرك في الجمجمة.', 'عظام الأذن الوسطى (المطرقة والسندان والركاب) لا تُعدّ عادة ضمن الـ22 عظمة.'],
      en: ['The mandible is the only movable bone of the skull.', 'The ear ossicles (malleus, incus, stapes) are usually counted separately from the 22 skull bones.'],
    },
  },
  mandible: {
    sys: 'skeletal', latin: 'Mandibula',
    name: { ar: 'الفك السفلي', en: 'Mandible' },
    desc: {
      ar: `أكبر وأقوى عظام الوجه. يتكوّن من جسم أفقي يحمل الأسنان السفلية وفرعين (Rami) صاعدين، ينتهي كل منهما بلقمة (Condyle) تتمفصل مع العظم الصدغي في المفصل الصدغي الفكي، وبنتوء إكليلي (Coronoid) لارتكاز العضلة الصدغية. على سطحه الأمامي الثقبة الذقنية.`,
      en: `The largest and strongest facial bone: a horseshoe-shaped body carrying the lower teeth and two vertical rami. Each ramus ends in a condyle (articulating with the temporal bone at the TMJ) and a coronoid process (temporalis attachment). The mental foramen lies on its outer surface.`,
    },
    func: { ar: `المضغ والكلام وحمل الأسنان السفلية، وهو منشأ ومرتكز لعضلات المضغ (الماضغة، الصدغية، الجناحيتان).`, en: `Mastication, speech and support of the lower teeth; attachment of the muscles of mastication (masseter, temporalis, pterygoids).` },
    clin: {
      ar: `كسوره غالباً مزدوجة لأنه يشكّل حلقة مع قاعدة الجمجمة. خلع المفصل الصدغي الفكي يحدث عند فتح الفم الواسع. يُحقن مخدّر العصب السنخي السفلي عند الثقبة الفكية لعلاج الأسنان السفلية.`,
      en: `Fractures are often bilateral because the mandible forms a ring with the skull base. TMJ dislocation can occur with wide yawning. The inferior alveolar nerve block (at the mandibular foramen) anaesthetises the lower teeth.`,
    },
    facts: { ar: ['يتكوّن عند الولادة من نصفين يلتحمان في السنة الأولى.'], en: ['At birth it consists of two halves that fuse during the first year.'] },
  },
  cervical_spine: {
    sys: 'skeletal', latin: 'Vertebrae cervicales C1–C7',
    name: { ar: 'الفقرات العنقية', en: 'Cervical vertebrae' },
    desc: {
      ar: `سبع فقرات صغيرة (C1–C7) تشكّل تقعّراً أمامياً (قعس عنقي). تتميّز بوجود ثقبة مستعرضة يمر فيها الشريان الفقري. الفقرة الأولى الأطلس (Atlas) بلا جسم، والثانية المحور (Axis) لها سنّ (Dens) يدور حوله الأطلس. السابعة بارزة (Vertebra prominens) ويُحس نتوؤها الشوكي بسهولة.`,
      en: `Seven small vertebrae (C1–C7) forming a forward (lordotic) curve. All have transverse foramina for the vertebral artery. C1 (atlas) has no body; C2 (axis) has the dens around which the atlas rotates. C7 (vertebra prominens) has an easily palpable spinous process.`,
    },
    func: { ar: `حمل الرأس وتحريكه؛ المفصل الأطلسي القذالي مسؤول عن إيماءة "نعم"، والمفصل الأطلسي المحوري عن نحو 50% من دوران الرقبة "لا". تحمي الجزء العنقي من الحبل الشوكي.`, en: `Support and movement of the head: the atlanto-occipital joint allows nodding ("yes"), the atlanto-axial joint provides ~50% of neck rotation ("no"). Protects the cervical spinal cord.` },
    clin: {
      ar: `إصابة الارتداد (Whiplash) في حوادث السيارات. كسر المشنوق (Hangman’s fracture) يصيب C2. انزلاق القرص الأكثر شيوعاً بين C5–C6. إصابة الحبل الشوكي فوق C3–C5 تهدّد التنفس لأن العصب الحجابي ينشأ من C3–C5.`,
      en: `Whiplash injury in car accidents; hangman’s fracture involves C2; the commonest cervical disc herniation is C5–C6. Cord injury above C3–C5 threatens breathing because the phrenic nerve arises from C3–C5.`,
    },
    facts: { ar: ['تقريباً كل الثدييات — حتى الزرافة — لديها 7 فقرات عنقية.'], en: ['Almost all mammals — even giraffes — have 7 cervical vertebrae.'] },
  },
  thoracic_spine: {
    sys: 'skeletal', latin: 'Vertebrae thoracicae T1–T12',
    name: { ar: 'الفقرات الصدرية', en: 'Thoracic vertebrae' },
    desc: {
      ar: `اثنتا عشرة فقرة (T1–T12) تتميّز بوجود وجيهات ضلعية (Costal facets) على أجسامها ونتوءاتها المستعرضة للتمفصل مع الأضلاع، ونتوءات شوكية طويلة مائلة للأسفل. تشكّل تحدّباً خلفياً (حداب صدري طبيعي).`,
      en: `Twelve vertebrae (T1–T12) with costal facets on their bodies and transverse processes for rib articulation, and long, downward-sloping spinous processes. Together they form the normal posterior (kyphotic) curve.`,
    },
    func: { ar: `دعم القفص الصدري وحماية الحبل الشوكي، مع حركة محدودة بسبب ارتباطها بالأضلاع، والدوران هو الحركة الأوضح فيها.`, en: `Support the rib cage and protect the spinal cord; movement is limited by the ribs, rotation being the main movement.` },
    clin: { ar: `كسور الانضغاط بسبب هشاشة العظام تسبّب زيادة الحداب (حدبة الأرملة). الجنف (Scoliosis) انحناء جانبي يظهر غالباً في هذه المنطقة.`, en: `Osteoporotic compression fractures increase the kyphosis ("dowager’s hump"). Scoliosis (lateral curvature) most often affects the thoracic region.` },
    facts: { ar: ['زاوية القص (لويس) تقع بمستوى القرص بين T4 و T5.'], en: ['The sternal angle (of Louis) lies at the level of the T4/T5 disc.'] },
  },
  lumbar_spine: {
    sys: 'skeletal', latin: 'Vertebrae lumbales L1–L5',
    name: { ar: 'الفقرات القطنية', en: 'Lumbar vertebrae' },
    desc: {
      ar: `خمس فقرات (L1–L5) هي الأكبر في العمود الفقري، أجسامها كلوية الشكل ونتوءاتها الشوكية مربعة عريضة، ولا تحوي ثقوباً مستعرضة أو وجيهات ضلعية. تشكّل قعساً قطنياً (تقعّر أمامي).`,
      en: `Five vertebrae (L1–L5), the largest of the column, with kidney-shaped bodies and broad, hatchet-shaped spinous processes; no transverse foramina or costal facets. They form the lumbar lordosis.`,
    },
    func: { ar: `تحمّل معظم وزن الجزء العلوي من الجسم ونقله للحوض، والسماح بالانثناء والبسط.`, en: `Bear most of the upper-body weight and transmit it to the pelvis; allow flexion and extension.` },
    clin: {
      ar: `الانزلاق الغضروفي أكثر ما يكون بين L4–L5 و L5–S1، ويسبّب ألم عرق النسا. البزل القطني يُجرى بين L3–L4 أو L4–L5 لأن الحبل الشوكي ينتهي عند L1–L2. الخط الواصل بين قمتي العرفين الحرقفيين يمر بمستوى L4.`,
      en: `Disc herniation is commonest at L4–L5 and L5–S1, causing sciatica. Lumbar puncture is performed at L3–L4 or L4–L5 because the cord ends at L1–L2; the line joining the iliac crests (Tuffier’s line) crosses L4.`,
    },
    facts: { ar: ['آلام أسفل الظهر من أكثر أسباب الإعاقة المهنية شيوعاً في العالم.'], en: ['Low back pain is one of the leading causes of disability worldwide.'] },
  },
  sacrum: {
    sys: 'skeletal', latin: 'Os sacrum et Os coccygis',
    name: { ar: 'العجز والعصعص', en: 'Sacrum & Coccyx' },
    desc: {
      ar: `العجز عظم مثلثي ناتج عن التحام 5 فقرات عجزية، يتمفصل جانبياً مع عظمي الورك في المفصلين العجزيين الحرقفيين، وتخرج من ثقوبه الأعصاب العجزية. العصعص (عظم الذنب) يتكوّن من 3–5 فقرات ملتحمة صغيرة.`,
      en: `The sacrum is a triangular bone formed by 5 fused sacral vertebrae; it articulates laterally with the hip bones at the sacroiliac joints and transmits the sacral nerves through its foramina. The coccyx (tailbone) consists of 3–5 small fused vertebrae.`,
    },
    func: { ar: `نقل وزن الجسم من العمود الفقري إلى الحوض والأطراف السفلية، ومرتكز لعضلات وأربطة قاع الحوض.`, en: `Transmits body weight from the spine to the pelvis and lower limbs; attachment for pelvic-floor muscles and ligaments.` },
    clin: { ar: `التهاب المفصل العجزي الحرقفي (من علامات التهاب الفقار اللاصق). ألم العصعص بعد السقوط. الحقن فوق الجافية العجزي عبر الفرجة العجزية.`, en: `Sacroiliitis (an early sign of ankylosing spondylitis); coccydynia after falls; caudal epidural injection through the sacral hiatus.` },
    facts: { ar: ['تلتحم الفقرات العجزية تدريجياً حتى سن 25–30 تقريباً.'], en: ['The sacral vertebrae finish fusing around age 25–30.'] },
  },
  ribs: {
    sys: 'skeletal', latin: 'Costae',
    name: { ar: 'الأضلاع (القفص الصدري)', en: 'Ribs (Rib cage)' },
    desc: {
      ar: `اثنا عشر زوجاً من الأضلاع: الأزواج 1–7 أضلاع حقيقية تتصل بالقص مباشرة بغضاريفها، و8–10 أضلاع كاذبة تتصل بغضروف الضلع الذي فوقها، و11–12 أضلاع عائمة لا تتصل أمامياً. يتمفصل كل ضلع خلفياً مع الفقرات الصدرية.`,
      en: `Twelve pairs: ribs 1–7 are true ribs (own costal cartilage to the sternum), 8–10 are false ribs (join the cartilage above), and 11–12 are floating ribs (no anterior attachment). Each rib articulates posteriorly with the thoracic vertebrae.`,
    },
    func: { ar: `حماية القلب والرئتين والأعضاء العلوية للبطن، والمشاركة في التنفس: حركة "مقبض المضخة" للأضلاع العلوية و"مقبض الدلو" للأضلاع السفلية تزيد أبعاد الصدر.`, en: `Protect the heart, lungs and upper abdominal organs, and take part in breathing: "pump-handle" movement of upper ribs and "bucket-handle" movement of lower ribs enlarge the thorax.` },
    clin: {
      ar: `كسور الأضلاع شائعة (5–9 غالباً) وقد تسبّب استرواح الصدر. الصدر السائب (Flail chest) عند كسر عدة أضلاع في موضعين. تمر الحزمة الوعائية العصبية الوربية أسفل كل ضلع، لذا تُدخل الإبرة فوق الحافة العلوية للضلع السفلي عند بزل الجنبة.`,
      en: `Rib fractures (commonly ribs 5–9) can cause pneumothorax; multiple ribs broken in two places produce a flail chest. The intercostal neurovascular bundle runs along the lower border of each rib, so chest drains/needles are inserted just above the rib below.`,
    },
    facts: { ar: ['الضلع العنقي الإضافي يوجد لدى نحو 0.5% من الناس وقد يضغط على الضفيرة العضدية.'], en: ['An extra cervical rib occurs in ~0.5% of people and can compress the brachial plexus.'] },
  },
  sternum: {
    sys: 'skeletal', latin: 'Sternum',
    name: { ar: 'عظم القص', en: 'Sternum' },
    desc: {
      ar: `عظم مسطح في منتصف الصدر الأمامي يتكوّن من ثلاثة أجزاء: القبضة (Manubrium) والجسم والنتوء الرهابي (Xiphoid). ملتقى القبضة والجسم يشكّل زاوية القص (زاوية لويس) بمستوى الضلع الثاني.`,
      en: `A flat bone in the anterior midline with three parts: manubrium, body and xiphoid process. The manubriosternal junction forms the sternal angle (of Louis) at the level of the 2nd costal cartilage.`,
    },
    func: { ar: `ارتكاز غضاريف الأضلاع والترقوتين، وحماية القلب والأوعية الكبيرة.`, en: `Anchors the costal cartilages and clavicles; protects the heart and great vessels.` },
    clin: { ar: `زاوية القص معلم مهم لعدّ الأضلاع. ضغطات الإنعاش القلبي الرئوي تُطبّق على النصف السفلي للقص. شق القص الناصف يُستخدم في جراحات القلب المفتوح، ويمكن أخذ خزعة نقي العظم منه.`, en: `The sternal angle is the landmark for counting ribs. CPR compressions are applied to the lower half of the sternum. Median sternotomy gives access in open-heart surgery; marrow can be aspirated from it.` },
    facts: { ar: ['النتوء الرهابي غضروفي في الصغر ويتعظّم عادة بعد سن الأربعين.'], en: ['The xiphoid is cartilaginous in youth and usually ossifies after age 40.'] },
  },
  clavicle: {
    sys: 'skeletal', latin: 'Clavicula',
    name: { ar: 'الترقوة', en: 'Clavicle' },
    desc: { ar: `عظم طويل أفقي على شكل حرف S، يتمفصل إنسياً مع القص (المفصل القصي الترقوي) ووحشياً مع النتوء الأخرمي للوح الكتف.`, en: `A horizontal S-shaped long bone articulating medially with the sternum (sternoclavicular joint) and laterally with the acromion (acromioclavicular joint).` },
    func: { ar: `الدعامة العظمية الوحيدة التي تربط الطرف العلوي بالهيكل المحوري، تُبقي الكتف بعيداً عن الصدر لحرية الحركة، وتنقل القوى من الذراع إلى الجذع.`, en: `The only bony strut linking the upper limb to the axial skeleton; holds the shoulder away from the trunk for free movement and transmits forces from the arm to the trunk.` },
    clin: { ar: `من أكثر العظام كسراً، وعادة عند الملتقى بين الثلث الأوسط والوحشي نتيجة السقوط على اليد الممدودة أو الكتف.`, en: `One of the most frequently fractured bones, usually at the junction of the middle and lateral thirds after a fall on the shoulder or outstretched hand.` },
    facts: { ar: ['أول عظم يبدأ بالتعظّم في الجنين (الأسبوع 5–6) وآخر عظم يكتمل التحامه (نحو 25 سنة).'], en: ['First bone to start ossifying in the embryo (week 5–6) and among the last to finish (~25 years).'] },
  },
  scapula: {
    sys: 'skeletal', latin: 'Scapula',
    name: { ar: 'لوح الكتف', en: 'Scapula' },
    desc: { ar: `عظم مسطح مثلثي على الجدار الخلفي للصدر (فوق الأضلاع 2–7). أهم معالمه: الشوكة، النتوء الأخرمي، النتوء الغرابي، والجوف العنابي الذي يتمفصل مع رأس العضد.`, en: `A flat triangular bone on the posterior chest wall (over ribs 2–7). Key features: spine, acromion, coracoid process and the glenoid cavity that articulates with the humeral head.` },
    func: { ar: `منشأ لـ17 عضلة منها عضلات الكفة المدوّرة، ويوفّر حركته على الصدر مدى واسعاً لحركة الكتف.`, en: `Attachment for 17 muscles including the rotator cuff; its gliding on the thorax greatly increases shoulder range of motion.` },
    clin: { ar: `لوح الكتف المجنّح (Winged scapula) ينتج عن إصابة العصب الصدري الطويل المغذّي للعضلة المنشارية الأمامية.`, en: `Winged scapula results from injury to the long thoracic nerve supplying serratus anterior.` },
    facts: { ar: ['كسور لوح الكتف نادرة وتدل على رضّ عنيف.'], en: ['Scapular fractures are rare and indicate high-energy trauma.'] },
  },
  humerus: {
    sys: 'skeletal', latin: 'Humerus',
    name: { ar: 'عظم العضد', en: 'Humerus' },
    desc: { ar: `أطول عظام الطرف العلوي. أعلاه رأس كروي وعنق تشريحي وحدبتان كبرى وصغرى وعنق جراحي، وفي جسمه الحدبة الدالية والميزاب الكعبري (للعصب الكعبري)، وأسفله اللقيمتان الإنسية والوحشية والبكرة والرُّؤيس.`, en: `The longest bone of the upper limb: proximally a head, anatomical neck, greater and lesser tubercles and surgical neck; the shaft bears the deltoid tuberosity and radial (spiral) groove; distally the medial and lateral epicondyles, trochlea and capitulum.` },
    func: { ar: `يشكّل مفصل الكتف مع لوح الكتف ومفصل المرفق مع الكعبرة والزند، ومرتكز لعضلات الكتف والذراع.`, en: `Forms the shoulder joint with the scapula and the elbow joint with the radius and ulna; attachment for shoulder and arm muscles.` },
    clin: { ar: `كسر العنق الجراحي يهدّد العصب الإبطي، وكسر منتصف الجسم يهدّد العصب الكعبري (اليد المتدلية)، وكسر فوق اللقمتين عند الأطفال يهدّد الشريان العضدي والعصب المتوسط. خلف اللقيمة الإنسية يمر العصب الزندي ("عظمة الضحك").`, en: `Surgical-neck fracture endangers the axillary nerve; mid-shaft fracture the radial nerve (wrist drop); supracondylar fracture in children the brachial artery and median nerve. The ulnar nerve runs behind the medial epicondyle ("funny bone").` },
    facts: { ar: ['مفصل الكتف هو الأكثر حركة والأكثر عرضة للخلع في الجسم.'], en: ['The shoulder is the most mobile — and most frequently dislocated — joint in the body.'] },
  },
  radius: {
    sys: 'skeletal', latin: 'Radius',
    name: { ar: 'عظم الكعبرة', en: 'Radius' },
    desc: { ar: `العظم الوحشي في الساعد (جهة الإبهام). رأسه القرصي يتمفصل مع رُؤيس العضد، وطرفه السفلي عريض ويشكّل معظم مفصل الرسغ وينتهي بالنتوء الإبري.`, en: `The lateral (thumb-side) bone of the forearm. Its disc-shaped head articulates with the capitulum; its broad distal end forms most of the wrist joint and ends in the styloid process.` },
    func: { ar: `يدور حول الزند في حركتي الكبّ (Pronation) والبسط (Supination)، وينقل القوى من اليد إلى الساعد.`, en: `Rotates around the ulna during pronation and supination; transmits forces from the hand to the forearm.` },
    clin: { ar: `كسر كولز (Colles) للطرف السفلي للكعبرة مع انزياح خلفي ("تشوّه الشوكة") شائع عند كبار السن بعد السقوط على اليد الممدودة. النبض الكعبري يُجسّ عند الرسغ. خلع رأس الكعبرة عند الأطفال ("مرفق المربية").`, en: `Colles’ fracture (distal radius, dorsal displacement, "dinner-fork" deformity) is common in older adults after a fall on an outstretched hand. The radial pulse is felt at the wrist. "Pulled elbow" (radial head subluxation) occurs in young children.` },
    facts: { ar: ['الكعبرة أكثر عظام الساعد تعرّضاً للكسر.'], en: ['The radius is the most commonly fractured forearm bone.'] },
  },
  ulna: {
    sys: 'skeletal', latin: 'Ulna',
    name: { ar: 'عظم الزند', en: 'Ulna' },
    desc: { ar: `العظم الإنسي في الساعد (جهة الخنصر). طرفه العلوي كبير ويحمل الناتئ المرفقي (Olecranon) — "كوع اليد" — والثلمة البكرية التي تحتضن بكرة العضد.`, en: `The medial (little-finger side) forearm bone. Its large proximal end carries the olecranon — the point of the elbow — and the trochlear notch that grips the humeral trochlea.` },
    func: { ar: `يشكّل الأساس الثابت لمفصل المرفق (حركة انثناء وبسط)، والمحور الذي تدور حوله الكعبرة.`, en: `Provides the stable hinge of the elbow (flexion/extension) and the axis around which the radius rotates.` },
    clin: { ar: `كسر مونتيجيا: كسر الزند مع خلع رأس الكعبرة. كسر الناتئ المرفقي بالسقوط على المرفق، وسحب العضلة ثلاثية الرؤوس يباعد القطع.`, en: `Monteggia fracture: ulnar fracture with radial-head dislocation. Olecranon fractures follow falls on the elbow; the triceps pulls the fragments apart.` },
    facts: { ar: ['الكعبرة والزند مرتبطان بغشاء بين عظمي ليفي قوي.'], en: ['Radius and ulna are bound by a strong fibrous interosseous membrane.'] },
  },
  hand: {
    sys: 'skeletal', latin: 'Ossa manus',
    name: { ar: 'عظام اليد', en: 'Bones of the hand' },
    desc: { ar: `27 عظمة: 8 عظام رسغية في صفين (الزورقي، الهلالي، المثلثي، الحمصي / المربّع المنحرف، شبه المنحرف، الكبير، الكلّابي)، و5 عظام سنعية (مشط اليد)، و14 سلامية (اثنتان للإبهام وثلاث لكل إصبع).`, en: `27 bones: 8 carpals in two rows (scaphoid, lunate, triquetrum, pisiform / trapezium, trapezoid, capitate, hamate), 5 metacarpals and 14 phalanges (two in the thumb, three in each finger).` },
    func: { ar: `القبض الدقيق والقوي، والإبهام المقابل (Opposable thumb) يميّز الإنسان ويتيح استخدام الأدوات والكتابة.`, en: `Precision and power grips; the opposable thumb allows tool use and writing.` },
    clin: { ar: `كسر العظم الزورقي هو الأشيع بين عظام الرسغ، ويظهر كألم في "علبة السعوط التشريحية"، ويهدّد بالنخر اللاوعائي لأن تروية العظم راجعة. كسر الملاكم يصيب عنق المشط الخامس.`, en: `Scaphoid fracture is the commonest carpal fracture (tenderness in the anatomical snuffbox) and risks avascular necrosis due to its retrograde blood supply. Boxer’s fracture involves the neck of the 5th metacarpal.` },
    facts: { ar: ['عظام اليدين معاً (54) تمثّل ربع عظام الجسم تقريباً.'], en: ['Together the hands (54 bones) contain about a quarter of the body’s bones.'] },
  },
  pelvis: {
    sys: 'skeletal', latin: 'Os coxae / Pelvis',
    name: { ar: 'عظما الورك (الحوض)', en: 'Hip bones (Pelvis)' },
    desc: { ar: `كل عظم ورك ينتج عن التحام ثلاثة عظام: الحرقفة (Ilium) والإسك (Ischium) والعانة (Pubis) عند الحُق (Acetabulum) الذي يستقبل رأس الفخذ. يرتبط العظمان أمامياً في الارتفاق العاني، ومع العجز خلفياً يكوّنان الحزام الحوضي.`, en: `Each hip bone results from fusion of the ilium, ischium and pubis at the acetabulum, which receives the femoral head. The two hip bones meet anteriorly at the pubic symphysis and, with the sacrum posteriorly, form the pelvic girdle.` },
    func: { ar: `نقل الوزن من الجذع إلى الأطراف السفلية، وحماية أعضاء الحوض (المثانة، الأعضاء التناسلية، المستقيم)، ومنشأ لعضلات الورك والفخذ والبطن.`, en: `Transfers weight from the trunk to the lower limbs, protects pelvic organs (bladder, reproductive organs, rectum) and gives origin to hip, thigh and abdominal muscles.` },
    clin: { ar: `كسور الحوض قد تسبّب نزيفاً داخلياً مهدّداً للحياة. حوض الأنثى أوسع ومدخله دائري مناسب للولادة. يُستخدم العرف الحرقفي لأخذ خزعة نقي العظم وطعوم العظم.`, en: `Pelvic fractures can cause life-threatening haemorrhage. The female pelvis is wider with a rounded inlet adapted for childbirth. The iliac crest is used for bone-marrow biopsy and bone grafts.` },
    facts: { ar: ['يكتمل التحام عظام الحق الثلاثة بين 15 و17 سنة.'], en: ['The three components fuse at the acetabulum between 15 and 17 years.'] },
  },
  femur: {
    sys: 'skeletal', latin: 'Femur',
    name: { ar: 'عظم الفخذ', en: 'Femur' },
    desc: { ar: `أطول وأقوى عظم في الجسم (نحو ربع طول الإنسان). أعلاه رأس كروي وعنق (زاويته مع الجسم نحو 125°) ومدوّران كبير وصغير، وعلى جسمه الخلفي الخط الخشن، وأسفله لقمتان تتمفصلان مع الظنبوب والرضفة.`, en: `The longest and strongest bone (about ¼ of body height): head, neck (neck–shaft angle ≈125°), greater and lesser trochanters, the linea aspera on the posterior shaft, and distal condyles articulating with the tibia and patella.` },
    func: { ar: `حمل وزن الجسم، وتكوين مفصلي الورك والركبة، ورافعة لعضلات المشي والجري.`, en: `Bears body weight, forms the hip and knee joints and acts as a lever for walking and running.` },
    clin: { ar: `كسر عنق الفخذ شائع عند المسنات المصابات بهشاشة العظام: الساق قصيرة ومدارة للخارج، وخطر النخر اللاوعائي للرأس بسبب انقطاع الشريان الفخذي المنعطف الإنسي. كسر جسم الفخذ قد يفقد المريض 1–1.5 لتر من الدم.`, en: `Femoral neck fractures are common in elderly osteoporotic women (shortened, externally rotated leg) and risk avascular necrosis of the head (medial circumflex femoral artery). A shaft fracture can lose 1–1.5 L of blood.` },
    facts: { ar: ['يتحمّل عظم الفخذ قوى تعادل عدة أضعاف وزن الجسم أثناء الجري.'], en: ['During running the femur withstands forces several times body weight.'] },
  },
  patella: {
    sys: 'skeletal', latin: 'Patella',
    name: { ar: 'الرضفة (صابونة الركبة)', en: 'Patella (Kneecap)' },
    desc: { ar: `أكبر عظم سمسماني في الجسم، يقع داخل وتر العضلة رباعية الرؤوس أمام مفصل الركبة، وسطحه الخلفي مغطى بغضروف يتمفصل مع ميزاب الفخذ.`, en: `The largest sesamoid bone, embedded in the quadriceps tendon in front of the knee; its cartilage-covered posterior surface articulates with the femoral groove.` },
    func: { ar: `تزيد ذراع الرافعة للعضلة رباعية الرؤوس فتقوّي بسط الركبة، وتحمي مفصل الركبة من الأمام.`, en: `Increases the lever arm of quadriceps, strengthening knee extension, and protects the front of the knee.` },
    clin: { ar: `منعكس الرضفة (L3–L4) بالطرق على الرباط الرضفي. خلع الرضفة غالباً للجهة الوحشية. كسرها بالرض المباشر على الركبة.`, en: `The patellar (knee-jerk) reflex tests L3–L4. Dislocation is usually lateral. Fracture follows direct blows to the knee.` },
    facts: { ar: ['تتعظّم الرضفة متأخرة بين عمر 3 و6 سنوات.'], en: ['The patella ossifies late, between 3 and 6 years of age.'] },
  },
  tibia: {
    sys: 'skeletal', latin: 'Tibia',
    name: { ar: 'الظنبوب (عظم القصبة)', en: 'Tibia (Shinbone)' },
    desc: { ar: `العظم الإنسي الكبير في الساق والحامل للوزن. أعلاه هضبة الظنبوب بلقمتيها، وأمامه الحدبة الظنبوبية لارتكاز الرباط الرضفي، وحافته الأمامية تحت الجلد مباشرة (القصبة)، وأسفله الكعب الإنسي.`, en: `The large, weight-bearing medial bone of the leg: tibial plateau (condyles) above, tibial tuberosity for the patellar ligament, a subcutaneous anterior border (the shin), and the medial malleolus below.` },
    func: { ar: `نقل الوزن من الفخذ إلى القدم وتكوين مفصلي الركبة والكاحل.`, en: `Transmits weight from femur to foot and forms part of the knee and ankle joints.` },
    clin: { ar: `أكثر العظام الطويلة تعرضاً للكسر المفتوح لأنه تحت الجلد. متلازمة الحيز (Compartment syndrome) بعد كسوره. يُستخدم أعلى الظنبوب للتسريب داخل العظم عند الأطفال في الطوارئ.`, en: `The most common site of open long-bone fractures because it lies just under the skin; compartment syndrome may follow. The proximal tibia is used for emergency intra-osseous access in children.` },
    facts: { ar: ['ثاني أطول عظم في الجسم بعد الفخذ.'], en: ['The second-longest bone after the femur.'] },
  },
  fibula: {
    sys: 'skeletal', latin: 'Fibula',
    name: { ar: 'الشظية', en: 'Fibula' },
    desc: { ar: `عظم رفيع في الجهة الوحشية من الساق لا يحمل إلا جزءاً صغيراً من الوزن. ينتهي أسفله بالكعب الوحشي الذي يثبّت الكاحل.`, en: `A slender bone on the lateral side of the leg bearing little body weight; its lower end forms the lateral malleolus that stabilises the ankle.` },
    func: { ar: `منشأ لعضلات الساق، وتثبيت مفصل الكاحل.`, en: `Gives origin to leg muscles and stabilises the ankle joint.` },
    clin: { ar: `العصب الشظوي المشترك يلتف حول عنق الشظية تحت الجلد؛ إصابته تسبّب تدلّي القدم. تُستخدم الشظية طُعماً عظمياً في الجراحات الترميمية. كسور الكاحل تُصنّف حسب مستوى كسر الشظية (تصنيف ويبر).`, en: `The common fibular nerve winds superficially around the fibular neck — injury causes foot drop. The fibula is harvested as a vascularised bone graft. Ankle fractures are classified by fibular level (Weber).` },
    facts: { ar: ['يمكن استئصال جزء كبير من جسم الشظية دون فقدان القدرة على المشي.'], en: ['Much of the fibular shaft can be removed without losing the ability to walk.'] },
  },
  foot: {
    sys: 'skeletal', latin: 'Ossa pedis',
    name: { ar: 'عظام القدم', en: 'Bones of the foot' },
    desc: { ar: `26 عظمة: 7 عظام رصغية (الكاحل/القعب، العقب، الزورقي، النردي، والإسفينية الثلاثة)، و5 عظام مشطية، و14 سلامية. ترتب لتشكّل أقواس القدم الطولية والمستعرضة.`, en: `26 bones: 7 tarsals (talus, calcaneus, navicular, cuboid, three cuneiforms), 5 metatarsals and 14 phalanges, arranged into longitudinal and transverse arches.` },
    func: { ar: `حمل الوزن وامتصاص الصدمات أثناء المشي، ورافعة مرنة لدفع الجسم للأمام.`, en: `Weight bearing, shock absorption during gait and a flexible lever that propels the body forward.` },
    clin: { ar: `كسر العقب بالسقوط من مرتفع وغالباً يرافقه كسر فقرات قطنية. كسر الإجهاد (كسر المسير) في المشط الثاني. القدم المسطحة عند انهيار القوس الطولي.`, en: `Calcaneal fractures occur in falls from height, often with lumbar vertebral fractures. Stress ("march") fractures affect the 2nd metatarsal. Flat foot results from collapse of the longitudinal arch.` },
    facts: { ar: ['العقب (عظم الكعب) أكبر عظام القدم.'], en: ['The calcaneus (heel bone) is the largest bone of the foot.'] },
  },

  // ------------------------------------------------------------------ MUSCULAR
  sternocleidomastoid: {
    sys: 'muscular', latin: 'M. sternocleidomastoideus',
    name: { ar: 'العضلة القصية الترقوية الخشائية', en: 'Sternocleidomastoid' },
    desc: { ar: `عضلة شريطية بارزة على جانب العنق. المنشأ: قبضة القص والثلث الإنسي للترقوة. المرتكز: الناتئ الخشائي للعظم الصدغي. التعصيب: العصب الإضافي (العصب القحفي الحادي عشر).`, en: `A prominent strap muscle on the side of the neck. Origin: manubrium and medial third of the clavicle. Insertion: mastoid process. Nerve: accessory nerve (CN XI).` },
    func: { ar: `عند تقلّص جهة واحدة: تميل الرأس للجهة نفسها وتدير الوجه للجهة المقابلة. عند تقلّص الجهتين: ثني العنق، وتساعد في التنفس العميق برفع القص.`, en: `Unilaterally: tilts the head to the same side and turns the face to the opposite side. Bilaterally: flexes the neck; accessory muscle of inspiration.` },
    clin: { ar: `تقسم العنق إلى مثلث أمامي وخلفي. الصعر الخلقي (Torticollis) ينتج عن تليّفها عند الرضيع.`, en: `Divides the neck into anterior and posterior triangles. Congenital torticollis results from its fibrosis in infants.` },
    facts: { ar: ['تُستخدم بوضوح في الضيق التنفسي — علامة سريرية مهمة.'], en: ['Visible use of this muscle during breathing is a sign of respiratory distress.'] },
  },
  trapezius: {
    sys: 'muscular', latin: 'M. trapezius',
    name: { ar: 'العضلة شبه المنحرفة', en: 'Trapezius' },
    desc: { ar: `عضلة سطحية كبيرة على شكل معيّن في أعلى الظهر. المنشأ: العظم القذالي والرباط القفوي والنتوءات الشوكية من C7 إلى T12. المرتكز: الثلث الوحشي للترقوة والأخرم وشوكة لوح الكتف. التعصيب: العصب الإضافي (XI).`, en: `A large superficial diamond-shaped muscle of the upper back. Origin: occipital bone, ligamentum nuchae, spinous processes C7–T12. Insertion: lateral clavicle, acromion and scapular spine. Nerve: accessory nerve (CN XI).` },
    func: { ar: `الألياف العلوية ترفع الكتف (هزّ الكتفين)، والوسطى تقرّب لوحي الكتف، والسفلية تخفضهما، ومعاً تدير لوح الكتف للأعلى لرفع الذراع فوق الرأس.`, en: `Upper fibres elevate (shrug), middle fibres retract, lower fibres depress the scapula; together they rotate the scapula upward for overhead abduction.` },
    clin: { ar: `يُفحص العصب الإضافي بطلب هزّ الكتفين ضد مقاومة. قد يُصاب العصب في جراحات المثلث الخلفي للعنق.`, en: `CN XI is tested by shrugging against resistance; it can be injured during surgery in the posterior triangle.` },
    facts: { ar: ['سُمّيت لأن العضلتين معاً تشكّلان شكل شبه منحرف.'], en: ['Named because left and right together form a trapezium.'] },
  },
  deltoid: {
    sys: 'muscular', latin: 'M. deltoideus',
    name: { ar: 'العضلة الدالية', en: 'Deltoid' },
    desc: { ar: `عضلة مثلثية تكسو الكتف وتعطيه استدارته. المنشأ: الثلث الوحشي للترقوة والأخرم وشوكة لوح الكتف. المرتكز: الحدبة الدالية للعضد. التعصيب: العصب الإبطي (C5–C6).`, en: `A triangular muscle giving the shoulder its rounded contour. Origin: lateral clavicle, acromion, scapular spine. Insertion: deltoid tuberosity of the humerus. Nerve: axillary nerve (C5–C6).` },
    func: { ar: `الألياف الوسطى تبعد الذراع (من 15° إلى 90°)، والأمامية تثنيها وتديرها للداخل، والخلفية تبسطها وتديرها للخارج.`, en: `Middle fibres abduct the arm (15°–90°); anterior fibres flex and medially rotate; posterior fibres extend and laterally rotate.` },
    clin: { ar: `موضع شائع للحقن العضلي (اللقاحات). إصابة العصب الإبطي (خلع الكتف أو كسر العنق الجراحي) تسبّب ضعف إبعاد الذراع وفقدان الإحساس فوق الدالية ("بقعة شارة الفوج").`, en: `A common intramuscular injection site (vaccines). Axillary nerve injury (shoulder dislocation, surgical-neck fracture) weakens abduction and causes numbness over the "regimental badge" area.` },
    facts: { ar: ['أول 15° من الإبعاد تقوم بها العضلة فوق الشوكة.'], en: ['The first 15° of abduction are initiated by supraspinatus.'] },
  },
  pectoralis_major: {
    sys: 'muscular', latin: 'M. pectoralis major',
    name: { ar: 'العضلة الصدرية الكبرى', en: 'Pectoralis major' },
    desc: { ar: `عضلة مروحية كبيرة في مقدّمة الصدر لها رأسان: ترقوي وقصي ضلعي. المرتكز: الشفة الوحشية للميزاب بين الحدبتين في العضد. التعصيب: العصبان الصدريان الإنسي والوحشي.`, en: `A large fan-shaped muscle of the anterior chest with clavicular and sternocostal heads. Insertion: lateral lip of the intertubercular groove of the humerus. Nerves: medial and lateral pectoral nerves.` },
    func: { ar: `تقريب الذراع وتدويرها للداخل، والرأس الترقوي يثني الذراع، وتساعد في الشهيق القسري عند تثبيت الذراع.`, en: `Adducts and medially rotates the arm; the clavicular head flexes it; accessory inspiratory muscle when the arm is fixed.` },
    clin: { ar: `متلازمة بولاند: غياب خلقي للعضلة. يستقر نسيج الثدي على لفافتها، وتثبّت الورم بها مهم في تقييم سرطان الثدي.`, en: `Poland syndrome is congenital absence of the muscle. Breast tissue lies on its fascia — fixation of a breast tumour to it matters in staging.` },
    facts: { ar: ['تمثّل مع الصدرية الصغرى الجدار الأمامي للإبط.'], en: ['With pectoralis minor it forms the anterior wall of the axilla.'] },
  },
  biceps: {
    sys: 'muscular', latin: 'M. biceps brachii',
    name: { ar: 'العضلة ذات الرأسين العضدية', en: 'Biceps brachii' },
    desc: { ar: `عضلة في مقدّمة العضد برأسين: الطويل من الحدبة فوق العنابية، والقصير من النتوء الغرابي. المرتكز: حدبة الكعبرة والسفاق ذي الرأسين. التعصيب: العصب العضلي الجلدي (C5–C6).`, en: `Anterior arm muscle with two heads: long head from the supraglenoid tubercle, short head from the coracoid process. Insertion: radial tuberosity and bicipital aponeurosis. Nerve: musculocutaneous nerve (C5–C6).` },
    func: { ar: `أقوى مُبسِّط (Supinator) للساعد — مثل فتح البرغي — وثني المرفق، وثني ضعيف للكتف.`, en: `The most powerful supinator of the forearm (turning a screwdriver), flexor of the elbow and weak flexor of the shoulder.` },
    clin: { ar: `منعكس ذات الرأسين يختبر C5–C6. تمزّق الوتر الطويل يسبّب انتفاخاً في منتصف العضد ("علامة باباي").`, en: `The biceps reflex tests C5–C6. Rupture of the long-head tendon produces a bulge in the mid-arm ("Popeye sign").` },
    facts: { ar: ['يتصرّف وتر الرأس الطويل داخل محفظة مفصل الكتف.'], en: ['The long-head tendon runs inside the shoulder joint capsule.'] },
  },
  triceps: {
    sys: 'muscular', latin: 'M. triceps brachii',
    name: { ar: 'العضلة ثلاثية الرؤوس العضدية', en: 'Triceps brachii' },
    desc: { ar: `العضلة الوحيدة في الحيز الخلفي للعضد، لها ثلاثة رؤوس: طويل (من الحدبة تحت العنابية) ووحشي وإنسي (من خلف العضد). المرتكز: الناتئ المرفقي للزند. التعصيب: العصب الكعبري (C6–C8).`, en: `The only muscle of the posterior arm, with long (infraglenoid tubercle), lateral and medial heads (posterior humerus). Insertion: olecranon. Nerve: radial nerve (C6–C8).` },
    func: { ar: `البسط الرئيسي للمرفق (الدفع، النهوض من الكرسي)، والرأس الطويل يساعد في بسط الكتف وتقريبه.`, en: `Main extensor of the elbow (pushing, rising from a chair); the long head helps extend and adduct the shoulder.` },
    clin: { ar: `منعكس ثلاثية الرؤوس يختبر C7. في إصابة العصب الكعبري في الميزاب الحلزوني يبقى جزء من الثلاثية سليماً لأن فروعها تنشأ قبله.`, en: `The triceps reflex tests C7. With radial-nerve injury in the spiral groove, triceps is partly spared because its branches arise higher.` },
    facts: { ar: ['تشكّل نحو ثلثي كتلة عضلات العضد.'], en: ['It makes up about two-thirds of the arm’s muscle mass.'] },
  },
  forearm_muscles: {
    sys: 'muscular', latin: 'Mm. antebrachii',
    name: { ar: 'عضلات الساعد', en: 'Forearm muscles' },
    desc: { ar: `مجموعتان: الحيز الأمامي (القابضات والكابّات) تنشأ غالباً من اللقيمة الإنسية للعضد وتعصّبها الأعصاب المتوسطة والزندية، والحيز الخلفي (الباسطات والمبسّطة) تنشأ من اللقيمة الوحشية ويعصّبها العصب الكعبري.`, en: `Two groups: the anterior compartment (flexors and pronators) mostly from the medial epicondyle, supplied by the median and ulnar nerves; the posterior compartment (extensors and supinator) from the lateral epicondyle, supplied by the radial nerve.` },
    func: { ar: `ثني وبسط الرسغ والأصابع، والكبّ والبسط، وقوة القبضة.`, en: `Flexion and extension of the wrist and fingers, pronation/supination and grip strength.` },
    clin: { ar: `مرفق لاعب التنس (التهاب اللقيمة الوحشية) ومرفق لاعب الغولف (الإنسية). متلازمة النفق الرسغي بانضغاط العصب المتوسط. تقفّع فولكمان الإقفاري بعد متلازمة الحيز.`, en: `Tennis elbow (lateral epicondylitis) and golfer’s elbow (medial). Carpal tunnel syndrome compresses the median nerve. Volkmann’s ischaemic contracture follows compartment syndrome.` },
    facts: { ar: ['معظم عضلات تحريك الأصابع موجودة في الساعد وتصل الأصابع عبر أوتار طويلة.'], en: ['Most muscles that move the fingers lie in the forearm and act via long tendons.'] },
  },
  rectus_abdominis: {
    sys: 'muscular', latin: 'M. rectus abdominis',
    name: { ar: 'العضلة المستقيمة البطنية', en: 'Rectus abdominis' },
    desc: { ar: `عضلة طولية زوجية على جانبي الخط الأبيض. المنشأ: العرف العاني والارتفاق العاني. المرتكز: النتوء الرهابي وغضاريف الأضلاع 5–7. تقطعها تقاطعات وترية تعطي شكل "المربعات الستة". محاطة بغمد المستقيمة. التعصيب: الأعصاب الوربية T7–T12.`, en: `A paired vertical muscle either side of the linea alba. Origin: pubic crest and symphysis. Insertion: xiphoid and costal cartilages 5–7. Tendinous intersections create the "six-pack". Enclosed in the rectus sheath; nerves T7–T12.` },
    func: { ar: `ثني الجذع (الجلوس من الاستلقاء)، وزيادة الضغط داخل البطن في الزفير القسري والتغوّط والولادة.`, en: `Flexes the trunk (sit-ups) and raises intra-abdominal pressure in forced expiration, defecation and childbirth.` },
    clin: { ar: `الشق الناصف عبر الخط الأبيض قليل التروية. تباعد المستقيمتين (Diastasis recti) في الحمل. ورم دموي في الغمد من الشرايين الشرسوفية.`, en: `Midline laparotomy through the relatively avascular linea alba. Diastasis recti in pregnancy. Rectus-sheath haematoma from the epigastric arteries.` },
    facts: { ar: ['ظهور "المربعات" يعتمد على نسبة الدهون أكثر من قوة العضلة.'], en: ['Visibility of the "six-pack" depends more on body fat than on strength.'] },
  },
  external_oblique: {
    sys: 'muscular', latin: 'M. obliquus externus abdominis',
    name: { ar: 'العضلة المائلة الخارجية', en: 'External oblique' },
    desc: { ar: `أكبر وأسطح عضلات جدار البطن الجانبي. تنشأ من الأضلاع الثمانية السفلية وتتجه أليافها للأسفل والأمام ("اليدان في الجيبين")، وتنتهي بسفاق يشكّل الخط الأبيض والرباط الإربي.`, en: `The largest and most superficial lateral abdominal muscle, arising from the lower eight ribs; its fibres run down and forward ("hands in pockets") into an aponeurosis forming the linea alba and inguinal ligament.` },
    func: { ar: `تدوير الجذع للجهة المقابلة، الثني الجانبي، ضغط محتويات البطن ودعم الأحشاء.`, en: `Rotates the trunk to the opposite side, lateral flexion, compression and support of abdominal viscera.` },
    clin: { ar: `الفتق الإربي يمر عبر الحلقة الإربية السطحية في سفاقها. تُستخدم معرفة اتجاه أليافها في الشقوق الجراحية (شق ماكبرني).`, en: `Inguinal hernias pass through the superficial inguinal ring in its aponeurosis; knowledge of fibre direction guides incisions (e.g. McBurney’s/gridiron).` },
    facts: { ar: ['تعمل مع المائلة الداخلية المقابلة كفريق في دوران الجذع.'], en: ['It works with the opposite internal oblique to rotate the trunk.'] },
  },
  latissimus_dorsi: {
    sys: 'muscular', latin: 'M. latissimus dorsi',
    name: { ar: 'العضلة العريضة الظهرية', en: 'Latissimus dorsi' },
    desc: { ar: `أعرض عضلات الظهر. المنشأ: النتوءات الشوكية T7–L5 واللفافة الصدرية القطنية والعرف الحرقفي والأضلاع السفلية. المرتكز: قاع الميزاب بين الحدبتين في العضد. التعصيب: العصب الصدري الظهري (C6–C8).`, en: `The broadest back muscle. Origin: spinous processes T7–L5, thoracolumbar fascia, iliac crest, lower ribs. Insertion: floor of the intertubercular groove. Nerve: thoracodorsal nerve (C6–C8).` },
    func: { ar: `بسط وتقريب وتدوير العضد للداخل — حركات التسلّق والسباحة وسحب الجسم للأعلى.`, en: `Extends, adducts and medially rotates the arm — climbing, swimming, pull-ups.` },
    clin: { ar: `تُستخدم كسديلة عضلية في إعادة بناء الثدي وتغطية الجروح الكبيرة.`, en: `Used as a pedicled flap in breast reconstruction and large wound coverage.` },
    facts: { ar: ['تُسمّى "عضلة السبّاح" لدورها الكبير في السباحة.'], en: ['Nicknamed the "swimmer’s muscle".'] },
  },
  gluteus_maximus: {
    sys: 'muscular', latin: 'M. gluteus maximus',
    name: { ar: 'العضلة الألوية الكبرى', en: 'Gluteus maximus' },
    desc: { ar: `أكبر عضلة في الجسم وأثقلها. المنشأ: الحرقفة الخلفية والعجز والعصعص. المرتكز: السبيل الحرقفي الظنبوبي والحدبة الألوية للفخذ. التعصيب: العصب الألوي السفلي (L5–S2).`, en: `The largest and heaviest muscle. Origin: posterior ilium, sacrum, coccyx. Insertion: iliotibial tract and gluteal tuberosity. Nerve: inferior gluteal nerve (L5–S2).` },
    func: { ar: `بسط الورك القوي وتدويره للخارج — النهوض من الجلوس، صعود الدرج، الجري. لا تعمل كثيراً في المشي العادي.`, en: `Powerful hip extension and lateral rotation — rising from sitting, climbing stairs, running; little used in normal walking.` },
    clin: { ar: `الحقن العضلي في الربع العلوي الوحشي للأليَة لتجنّب العصب الوركي. علامة ترندلنبرغ تدل على ضعف الألوية الوسطى (وليس الكبرى).`, en: `Gluteal intramuscular injections go into the upper outer quadrant to avoid the sciatic nerve. Trendelenburg’s sign reflects gluteus medius (not maximus) weakness.` },
    facts: { ar: ['حجمها الكبير مرتبط بالمشي منتصباً على قدمين.'], en: ['Its large size is linked to upright bipedal posture.'] },
  },
  quadriceps: {
    sys: 'muscular', latin: 'M. quadriceps femoris',
    name: { ar: 'العضلة رباعية الرؤوس الفخذية', en: 'Quadriceps femoris' },
    desc: { ar: `أربع عضلات في مقدّمة الفخذ: المستقيمة الفخذية والمتسعة الوحشية والمتسعة الإنسية والمتسعة المتوسطة. تتحد بوتر يحيط بالرضفة ثم الرباط الرضفي إلى الحدبة الظنبوبية. التعصيب: العصب الفخذي (L2–L4).`, en: `Four muscles of the anterior thigh: rectus femoris, vastus lateralis, vastus medialis and vastus intermedius, uniting in a tendon around the patella and continuing as the patellar ligament to the tibial tuberosity. Nerve: femoral nerve (L2–L4).` },
    func: { ar: `البسط القوي للركبة (الوقوف، صعود الدرج، الركل)، والمستقيمة الفخذية تثني الورك أيضاً.`, en: `Powerful knee extension (standing up, climbing, kicking); rectus femoris also flexes the hip.` },
    clin: { ar: `منعكس الركبة (L3–L4). المتسعة الوحشية موضع مفضّل للحقن العضلي عند الرضّع. تضمر بسرعة بعد إصابات الركبة وتتطلّب إعادة تأهيل.`, en: `Knee-jerk reflex (L3–L4). Vastus lateralis is the preferred IM injection site in infants. Wastes quickly after knee injury and needs rehabilitation.` },
    facts: { ar: ['من أقوى مجموعات العضلات في الجسم.'], en: ['One of the strongest muscle groups in the body.'] },
  },
  hamstrings: {
    sys: 'muscular', latin: 'Mm. ischiocrurales',
    name: { ar: 'عضلات أوتار المأبض', en: 'Hamstrings' },
    desc: { ar: `ثلاث عضلات خلف الفخذ: ذات الرأسين الفخذية، ونصف الوترية، ونصف الغشائية. تنشأ من الحدبة الإسكية وتعصّبها فروع العصب الوركي.`, en: `Three posterior thigh muscles: biceps femoris, semitendinosus and semimembranosus. They arise from the ischial tuberosity and are supplied by the sciatic nerve.` },
    func: { ar: `ثني الركبة وبسط الورك، ومهمة في التحكّم بالساق أثناء الجري.`, en: `Flex the knee and extend the hip; important for controlling the leg during running.` },
    clin: { ar: `إصابات الشد العضلي شائعة جداً عند العدّائين ولاعبي كرة القدم. قد يُقتلع منشؤها من الحدبة الإسكية عند المراهقين.`, en: `Hamstring strains are very common in sprinters and footballers; avulsion of the ischial tuberosity can occur in adolescents.` },
    facts: { ar: ['وتر نصف الوترية يُستخدم كثيراً طُعماً لإعادة بناء الرباط الصليبي الأمامي.'], en: ['The semitendinosus tendon is a common graft for ACL reconstruction.'] },
  },
  gastrocnemius: {
    sys: 'muscular', latin: 'M. gastrocnemius',
    name: { ar: 'عضلة الساق التوأمية', en: 'Gastrocnemius' },
    desc: { ar: `العضلة السطحية لبطن الساق برأسين من لقمتي الفخذ. تتحد مع العضلة النعلية لتشكّل وتر العقب (وتر أخيل) المرتكز على العقب. التعصيب: العصب الظنبوبي (S1–S2).`, en: `The superficial calf muscle with two heads from the femoral condyles; joins soleus to form the calcaneal (Achilles) tendon inserting on the calcaneus. Nerve: tibial nerve (S1–S2).` },
    func: { ar: `ثني القدم الأخمصي (الوقوف على الأصابع، الدفع في المشي والقفز)، وتساعد في ثني الركبة.`, en: `Plantar flexion (standing on tiptoe, push-off in walking and jumping); assists knee flexion.` },
    clin: { ar: `منعكس الكاحل يختبر S1. تمزّق وتر أخيل (اختبار طومسون). خثار الأوردة العميقة غالباً يبدأ في أوردة الساق، ويسبّب ألماً وتورّماً في بطن الساق.`, en: `The ankle reflex tests S1. Achilles rupture is diagnosed with Thompson’s test. Deep-vein thrombosis often starts in calf veins, causing calf pain and swelling.` },
    facts: { ar: ['تقلّص عضلات الساق يضخ الدم الوريدي نحو القلب ("القلب الثاني").'], en: ['Calf contraction pumps venous blood back to the heart (the "second heart").'] },
  },
  tibialis_anterior: {
    sys: 'muscular', latin: 'M. tibialis anterior',
    name: { ar: 'العضلة الظنبوبية الأمامية وباسطات الأصابع', en: 'Tibialis anterior & toe extensors' },
    desc: { ar: `عضلة على الوجه الوحشي الأمامي للظنبوب. المرتكز: العظم الإسفيني الإنسي وقاعدة المشط الأول. التعصيب: العصب الشظوي العميق (L4–L5).`, en: `Lies along the anterolateral tibia. Insertion: medial cuneiform and base of the 1st metatarsal. Nerve: deep fibular nerve (L4–L5).` },
    func: { ar: `ثني القدم الظهري (رفع مقدمة القدم) وقلبها للداخل، وتمنع ارتطام القدم بالأرض في المشي.`, en: `Dorsiflexes and inverts the foot; prevents foot slap during gait.` },
    clin: { ar: `شللها (إصابة العصب الشظوي المشترك) يسبّب تدلّي القدم والمشية الخاطفة (Steppage gait). متلازمة الحيز الأمامي للساق.`, en: `Paralysis (common fibular nerve injury) causes foot drop and a high-stepping gait. Site of anterior compartment syndrome.` },
    facts: { ar: ['يمكن رؤية وترها بوضوح أمام الكاحل عند رفع القدم.'], en: ['Its tendon is clearly visible in front of the ankle on dorsiflexion.'] },
  },

  // ------------------------------------------------------------------ NERVOUS
  cerebrum: {
    sys: 'nervous', latin: 'Substantia alba cerebri', layer: 4,
    name: { ar: 'المخ (المادة البيضاء)', en: 'Cerebrum (white matter)' },
    desc: { ar: `يمثّل هذا الجزء المادة البيضاء العميقة لنصفي الكرة المخية (الألياف التي تربط القشرة ببعضها وببقية الجهاز العصبي)، أما القشرة فتظهر كفصوص منفصلة. المخ أكبر أجزاء الدماغ، يتكوّن من نصفي كرة يربطهما الجسم الثفني. سطحه (القشرة) مادة رمادية تكثر فيها التلافيف والأتلام. يُقسم كل نصف إلى فصوص: الجبهي، الجداري، الصدغي، القذالي (والجزيرة).`, en: `This part shows the deep white matter of the cerebral hemispheres (fibres connecting cortical areas with each other and the rest of the nervous system); the cortex is shown as separate lobes. The cerebrum is the largest part of the brain: two hemispheres joined by the corpus callosum. Its grey-matter surface (cortex) is folded into gyri and sulci. Each hemisphere has frontal, parietal, temporal and occipital lobes (plus the insula).` },
    func: { ar: `الفص الجبهي: الحركة الإرادية (التلفيف أمام المركزي)، الشخصية، التخطيط، ومنطقة بروكا للنطق. الجداري: الإحساس الجسدي. الصدغي: السمع والذاكرة (الحُصين) ومنطقة فيرنيكه لفهم اللغة. القذالي: الإبصار.`, en: `Frontal: voluntary movement (precentral gyrus), personality, planning, Broca’s speech area. Parietal: somatic sensation. Temporal: hearing, memory (hippocampus), Wernicke’s comprehension area. Occipital: vision.` },
    clin: { ar: `السكتة الدماغية (الأشيع في الشريان المخي الأوسط) تسبّب شللاً نصفياً في الجهة المقابلة. الحبسة الكلامية (بروكا/فيرنيكه). الصرع. كل نصف يتحكم بالجهة المعاكسة من الجسم.`, en: `Stroke (most often middle cerebral artery) causes contralateral hemiplegia; aphasias (Broca’s/Wernicke’s); epilepsy. Each hemisphere controls the opposite side of the body.` },
    facts: { ar: ['يحتوي الدماغ نحو 86 مليار خلية عصبية.', 'يستهلك نحو 20% من طاقة الجسم مع أنه 2% فقط من وزنه.'], en: ['The brain contains about 86 billion neurons.', 'It uses ~20% of the body’s energy while being only ~2% of its weight.'] },
  },
  cerebellum: {
    sys: 'nervous', latin: 'Cerebellum',
    name: { ar: 'المخيخ', en: 'Cerebellum' },
    desc: { ar: `يقع في الحفرة القحفية الخلفية تحت الفصين القذاليين ويفصله عنهما خيمة المخيخ. يتكوّن من الدودة في الوسط ونصفي كرة، وسطحه مثنيّ بوريقات دقيقة، ويرتبط بجذع الدماغ بثلاث سويقات مخيخية.`, en: `Lies in the posterior cranial fossa below the occipital lobes, separated by the tentorium cerebelli. Consists of a midline vermis and two hemispheres with fine folia, attached to the brainstem by three pairs of peduncles.` },
    func: { ar: `تنسيق الحركة والتوازن والوضعية وتعلّم المهارات الحركية. يتحكم بالجهة نفسها من الجسم.`, en: `Coordination, balance, posture and motor learning. It controls the same (ipsilateral) side of the body.` },
    clin: { ar: `إصابته تسبّب ترنّحاً في الجهة نفسها، ورعاشاً قصدياً، وعسر تناوب الحركات، ورأرأة، وكلاماً متقطعاً. الكحول يؤثّر على الدودة. انفتاق اللوزتين المخيخيتين عبر الثقبة العظمى خطر قاتل.`, en: `Lesions cause ipsilateral ataxia, intention tremor, dysdiadochokinesia, nystagmus and scanning speech. Alcohol affects the vermis. Tonsillar herniation through the foramen magnum is life-threatening.` },
    facts: { ar: ['يحتوي المخيخ أكثر من نصف خلايا الدماغ العصبية مع أنه 10% من حجمه.'], en: ['It holds over half of the brain’s neurons in ~10% of its volume.'] },
  },
  brainstem: {
    sys: 'nervous', latin: 'Truncus encephali',
    name: { ar: 'جذع الدماغ', en: 'Brainstem' },
    desc: { ar: `يتكوّن من الدماغ المتوسط والجسر والنخاع المستطيل، ويصل المخ بالحبل الشوكي. يحتوي أنوية الأعصاب القحفية من الثالث إلى الثاني عشر، وتمر عبره المسارات الحسية والحركية.`, en: `Comprises the midbrain, pons and medulla oblongata, connecting the cerebrum to the spinal cord. It contains the nuclei of cranial nerves III–XII and carries all ascending and descending tracts.` },
    func: { ar: `مراكز الحياة: التنفس، نبض القلب، ضغط الدم، الوعي واليقظة (التكوين الشبكي)، وانعكاسات البلع والسعال والتقيّؤ.`, en: `Vital centres for breathing, heart rate and blood pressure; consciousness and arousal (reticular formation); swallowing, coughing and vomiting reflexes.` },
    clin: { ar: `يُعتمد على غياب انعكاسات جذع الدماغ في تشخيص موت الدماغ. متلازمة المنحبس (Locked-in) بإصابة الجسر البطني. ارتفاع الضغط داخل القحف يضغط على النخاع المستطيل.`, en: `Absent brainstem reflexes are the basis of brain-death testing. Locked-in syndrome follows ventral pontine lesions. Raised intracranial pressure compresses the medulla ("coning").` },
    facts: { ar: ['10 من الأعصاب القحفية الـ12 تخرج من جذع الدماغ.'], en: ['10 of the 12 cranial nerves emerge from the brainstem.'] },
  },
  spinal_cord: {
    sys: 'nervous', latin: 'Medulla spinalis',
    name: { ar: 'الحبل الشوكي', en: 'Spinal cord' },
    desc: { ar: `يمتد من الثقبة العظمى حتى مستوى L1–L2 (المخروط النخاعي) بطول نحو 45 سم داخل القناة الفقرية. تخرج منه 31 زوجاً من الأعصاب الشوكية، وله انتفاخان عنقي وقطني، وتحته جذور ذيل الفرس. مادته الرمادية على شكل حرف H تحيط بها المادة البيضاء.`, en: `Extends from the foramen magnum to L1–L2 (conus medullaris), ~45 cm long, within the vertebral canal. It gives off 31 pairs of spinal nerves, has cervical and lumbar enlargements, and continues as the cauda equina. H-shaped grey matter is surrounded by white matter.` },
    func: { ar: `نقل الإشارات الحسية والحركية بين الدماغ والجسم، ومركز للأفعال المنعكسة (مثل منعكس الركبة).`, en: `Conducts sensory and motor signals between brain and body and acts as a centre for reflexes (e.g. knee jerk).` },
    clin: { ar: `البزل القطني تحت L2 لتجنّب الحبل. متلازمة ذيل الفرس (خدر السرج واحتباس البول) طارئة جراحية. مستوى إصابة الحبل يحدّد الشلل: فوق T1 شلل رباعي، وتحتها شلل سفلي.`, en: `Lumbar puncture is done below L2 to avoid the cord. Cauda equina syndrome (saddle anaesthesia, urinary retention) is a surgical emergency. Injury above T1 causes tetraplegia, below causes paraplegia.` },
    facts: { ar: ['الحبل الشوكي أقصر من العمود الفقري لأن العظام تنمو أسرع منه.'], en: ['The cord is shorter than the spine because the vertebral column outgrows it.'] },
  },
  sciatic_nerve: {
    sys: 'nervous', latin: 'N. ischiadicus',
    name: { ar: 'العصب الوركي', en: 'Sciatic nerve' },
    desc: { ar: `أكبر وأثخن عصب في الجسم (L4–S3). يخرج من الحوض عبر الثقبة الوركية الكبرى أسفل العضلة الكمثرية، وينزل خلف الفخذ، وينقسم فوق الحفرة المأبضية إلى العصب الظنبوبي والعصب الشظوي المشترك.`, en: `The largest and thickest nerve (L4–S3). It leaves the pelvis through the greater sciatic foramen below piriformis, descends in the posterior thigh and divides above the popliteal fossa into the tibial and common fibular nerves.` },
    func: { ar: `تعصيب حركي لعضلات أوتار المأبض وكل عضلات الساق والقدم، وحسّي لمعظم الساق والقدم.`, en: `Motor supply to the hamstrings and all muscles below the knee; sensation to most of the leg and foot.` },
    clin: { ar: `عرق النسا: ألم ينتشر خلف الفخذ والساق، غالباً بسبب انزلاق قرصي قطني. قد يُصاب بالحقن الخاطئ في الأليَة أو بخلع الورك الخلفي. متلازمة الكمثرية.`, en: `Sciatica: pain radiating down the back of the thigh and leg, usually from lumbar disc herniation. It can be injured by misplaced gluteal injections or posterior hip dislocation; piriformis syndrome.` },
    facts: { ar: ['قطره قرب منشئه نحو 2 سم — بعرض الإصبع تقريباً.'], en: ['Near its origin it is ~2 cm wide — about a finger’s width.'] },
  },
  median_nerve: {
    sys: 'nervous', latin: 'N. medianus',
    name: { ar: 'العصب المتوسط', en: 'Median nerve' },
    desc: { ar: `ينشأ من الحبلين الوحشي والإنسي للضفيرة العضدية (C5–T1)، يرافق الشريان العضدي، يعبر الحفرة المرفقية ثم النفق الرسغي إلى اليد.`, en: `Arises from the lateral and medial cords of the brachial plexus (C5–T1), runs with the brachial artery, crosses the cubital fossa and passes through the carpal tunnel into the hand.` },
    func: { ar: `يعصّب معظم قابضات الساعد وعضلات الرانفة (LOAF)، والإحساس في راحة اليد للإبهام والسبابة والوسطى ونصف البنصر.`, en: `Supplies most forearm flexors and the thenar muscles (LOAF), and sensation to the palmar side of the thumb, index, middle and half of the ring finger.` },
    clin: { ar: `متلازمة النفق الرسغي (خدر ليلي وضمور الرانفة) الأكثر شيوعاً بين اعتلالات انضغاط الأعصاب. إصابته العليا تعطي "يد البركة" عند محاولة قبض اليد.`, en: `Carpal tunnel syndrome (night-time tingling, thenar wasting) is the commonest entrapment neuropathy. Proximal injury causes the "hand of benediction" on attempting a fist.` },
    facts: { ar: ['LOAF: القطنيتان الوحشيتان، المقابلة للإبهام، المبعدة القصيرة، القابضة القصيرة للإبهام.'], en: ['LOAF = Lateral 2 lumbricals, Opponens pollicis, Abductor pollicis brevis, Flexor pollicis brevis.'] },
  },
  eye: {
    sys: 'nervous', latin: 'Bulbus oculi',
    name: { ar: 'العين', en: 'Eye' },
    desc: { ar: `كرة قطرها نحو 24 مم داخل محجر العين، بثلاث طبقات: ليفية (الصلبة والقرنية)، ووعائية (المشيمية والجسم الهدبي والقزحية)، وعصبية (الشبكية). فيها العدسة والخلط المائي والجسم الزجاجي، وتحرّكها 6 عضلات خارجية.`, en: `A ~24 mm globe within the orbit with three coats: fibrous (sclera, cornea), vascular (choroid, ciliary body, iris) and neural (retina). It contains the lens, aqueous humour and vitreous body, and is moved by 6 extra-ocular muscles.` },
    func: { ar: `الإبصار: تحوّل العصي والمخاريط في الشبكية الضوءَ إلى إشارات تنتقل عبر العصب البصري (II). العضلات الخارجية يعصّبها الأعصاب III و IV و VI.`, en: `Vision: retinal rods and cones convert light into signals carried by the optic nerve (CN II). Extra-ocular muscles are supplied by CN III, IV and VI.` },
    clin: { ar: `وذمة حليمة العصب البصري علامة ارتفاع الضغط داخل القحف. الزَّرَق (الجلوكوما). منعكس الحدقة للضوء: الطرف الوارد العصب II والصادر العصب III.`, en: `Papilloedema indicates raised intracranial pressure. Glaucoma. The pupillary light reflex: afferent CN II, efferent CN III.` },
    facts: { ar: ['الشبكية امتداد للدماغ نفسه أثناء التطور الجنيني.'], en: ['The retina develops as an outgrowth of the brain itself.'] },
  },

  // ------------------------------------------------------------------ RESPIRATORY
  larynx: {
    sys: 'respiratory', latin: 'Larynx',
    name: { ar: 'الحنجرة', en: 'Larynx' },
    desc: { ar: `تقع بمستوى الفقرات C3–C6، وهيكلها غضاريف أهمها: الدرقي (تفاحة آدم)، والحلقي (الحلقة الكاملة الوحيدة)، ولسان المزمار، والطرجهاليان. تحتوي الحبال الصوتية.`, en: `Lies at C3–C6; its skeleton is cartilage — thyroid (Adam’s apple), cricoid (the only complete ring), epiglottis and arytenoids — and it houses the vocal cords.` },
    func: { ar: `حماية مجرى الهواء أثناء البلع (لسان المزمار)، وإصدار الصوت، والسعال.`, en: `Protects the airway during swallowing (epiglottis), produces voice (phonation) and enables coughing.` },
    clin: { ar: `بضع الغشاء الحلقي الدرقي في الطوارئ عند انسداد مجرى الهواء العلوي. إصابة العصب الحنجري الراجع في جراحة الغدة الدرقية تسبّب بحّة الصوت.`, en: `Emergency cricothyroidotomy through the cricothyroid membrane for upper-airway obstruction. Recurrent laryngeal nerve injury during thyroid surgery causes hoarseness.` },
    facts: { ar: ['تفاحة آدم أوضح عند الذكور بسبب تأثير التستوستيرون في البلوغ.'], en: ['The Adam’s apple is more prominent in males due to pubertal testosterone.'] },
  },
  trachea: {
    sys: 'respiratory', latin: 'Trachea',
    name: { ar: 'الرُّغامى (القصبة الهوائية)', en: 'Trachea' },
    desc: { ar: `أنبوب طوله 10–12 سم يمتد من C6 حتى التشعّب (الجؤجؤ – Carina) بمستوى T4/T5. تدعمه 16–20 حلقة غضروفية على شكل حرف C مفتوحة للخلف حيث العضلة الرغامية والمريء.`, en: `A 10–12 cm tube from C6 to the carina at T4/T5, supported by 16–20 C-shaped cartilage rings open posteriorly where the trachealis muscle and oesophagus lie.` },
    func: { ar: `توصيل الهواء إلى القصبات، وتنقية الهواء بواسطة المخاط والأهداب ("سلّم المخاط الهدبي").`, en: `Conducts air to the bronchi and cleans it via mucus and cilia (the "mucociliary escalator").` },
    clin: { ar: `فغر الرغامى (Tracheostomy) والتنبيب الرغامي. انحراف الرغامى علامة على استرواح الصدر الضاغط أو انخماص الرئة.`, en: `Tracheostomy and endotracheal intubation. Tracheal deviation suggests tension pneumothorax or lung collapse.` },
    facts: { ar: ['شكل حرف C يسمح للمريء بالتمدد عند بلع اللقمة.'], en: ['The C-shape allows the oesophagus to expand when swallowing.'] },
  },
  bronchi: {
    sys: 'respiratory', latin: 'Bronchi principales',
    name: { ar: 'القصبات الهوائية', en: 'Bronchi' },
    desc: { ar: `تنقسم الرغامى إلى قصبتين رئيسيتين؛ اليمنى أعرض وأقصر وأكثر عمودية. تتفرّع إلى قصبات فصّية ثم قطعية ثم قُصيبات (نحو 23 جيلاً من التفرّع) حتى الأسناخ الهوائية.`, en: `The trachea divides into two main bronchi; the right is wider, shorter and more vertical. They branch into lobar, segmental bronchi and bronchioles (~23 generations) down to the alveoli.` },
    func: { ar: `توزيع الهواء إلى أجزاء الرئتين المختلفة مع تدفئته وترطيبه.`, en: `Distribute warmed, humidified air to all parts of the lungs.` },
    clin: { ar: `الأجسام الغريبة المستنشقة تذهب غالباً إلى القصبة اليمنى. الربو يسبّب تضيّق القصبات. تنظير القصبات للتشخيص والعلاج.`, en: `Inhaled foreign bodies usually enter the right main bronchus. Asthma causes bronchoconstriction. Bronchoscopy is used for diagnosis and treatment.` },
    facts: { ar: ['شجرة الهواء تُسمّى "الشجرة القصبية" لأنها تشبه شجرة مقلوبة.'], en: ['The airways are called the "bronchial tree" — an upside-down tree.'] },
  },
  lung_r: {
    sys: 'respiratory', latin: 'Pulmo dexter', layer: 4,
    name: { ar: 'الرئة اليمنى', en: 'Right lung' },
    desc: { ar: `مقسومة إلى ثلاثة فصوص (علوي، أوسط، سفلي) بواسطة الشقّين الأفقي والمائل، وفيها 10 قطع قصبية رئوية. أقصر وأعرض من اليسرى لأن الكبد يرفع القبة اليمنى للحجاب. يغلّفها غشاء الجنبة.`, en: `Divided into three lobes (upper, middle, lower) by horizontal and oblique fissures, with 10 bronchopulmonary segments. Shorter and wider than the left because the liver raises the right hemidiaphragm. Covered by pleura.` },
    func: { ar: `تبادل الغازات: يدخل الأكسجين إلى الدم ويخرج ثاني أكسيد الكربون عبر جدر الأسناخ والشعيرات الدموية.`, en: `Gas exchange: oxygen enters and carbon dioxide leaves the blood across the alveolar–capillary membrane.` },
    clin: { ar: `الالتهاب الرئوي الاستنشاقي يصيب غالباً الفص السفلي الأيمن. الانصباب الجنبي واسترواح الصدر. الاستماع لأصوات التنفس في الفصوص المختلفة.`, en: `Aspiration pneumonia often affects the right lower lobe. Pleural effusion and pneumothorax. Breath sounds are auscultated over each lobe.` },
    facts: { ar: ['تحوي الرئتان معاً نحو 300–500 مليون سنخ بمساحة تقارب 70 م² (ملعب تنس تقريباً).'], en: ['Together the lungs hold ~300–500 million alveoli with ~70 m² surface (about a tennis court).'] },
  },
  lung_l: {
    sys: 'respiratory', latin: 'Pulmo sinister', layer: 4,
    name: { ar: 'الرئة اليسرى', en: 'Left lung' },
    desc: { ar: `فيها فصّان فقط (علوي وسفلي) يفصلهما الشق المائل. حافتها الأمامية فيها الثلمة القلبية لإفساح مكان للقلب، وتحتها لسين الرئة (Lingula). أصغر قليلاً من اليمنى.`, en: `Has only two lobes (upper and lower) separated by the oblique fissure. Its anterior border has the cardiac notch for the heart with the lingula below. Slightly smaller than the right lung.` },
    func: { ar: `تبادل الغازات مثل الرئة اليمنى، وتشارك بنحو 45% من سعة التهوية.`, en: `Gas exchange like the right lung, contributing about 45% of ventilation.` },
    clin: { ar: `سرطان الرئة من أكثر السرطانات فتكاً ويرتبط بالتدخين. التهاب اللسين قد يطمس الحافة اليسرى للقلب في صورة الصدر.`, en: `Lung cancer, strongly linked to smoking, is among the deadliest cancers. Lingular pneumonia can obscure the left heart border on chest X-ray.` },
    facts: { ar: ['اللسين يقابل الفص الأوسط في الرئة اليمنى.'], en: ['The lingula is the counterpart of the right middle lobe.'] },
  },
  diaphragm: {
    sys: 'respiratory', latin: 'Diaphragma', layer: 4,
    name: { ar: 'الحجاب الحاجز', en: 'Diaphragm' },
    desc: { ar: `صفيحة عضلية وترية على شكل قبتين تفصل الصدر عن البطن، في مركزها الوتر المركزي. يعصّبه العصب الحجابي (C3–C5). فتحاته: الوريد الأجوف السفلي (T8)، المريء (T10)، الأبهر (T12).`, en: `A dome-shaped musculotendinous sheet separating thorax from abdomen, with a central tendon. Supplied by the phrenic nerve (C3–C5). Openings: IVC (T8), oesophagus (T10), aorta (T12).` },
    func: { ar: `العضلة الرئيسية للشهيق: عند انقباضه ينخفض ويزداد حجم الصدر فيدخل الهواء. يساعد أيضاً في رفع الضغط البطني.`, en: `The main muscle of inspiration: contraction flattens it, enlarging the thorax and drawing air in. Also helps raise intra-abdominal pressure.` },
    clin: { ar: `فتق الحجاب (Hiatal hernia). تهيّجه يسبّب ألماً منتقلاً إلى الكتف (C4). القبة اليمنى أعلى بسبب الكبد. الفتق الحجابي الخلقي (بوكداليك) عند المواليد.`, en: `Hiatal hernia. Diaphragmatic irritation refers pain to the shoulder tip (C4). The right dome is higher due to the liver. Congenital diaphragmatic hernia (Bochdalek) in newborns.` },
    facts: { ar: ['"C3, 4, 5 keeps the diaphragm alive" — عبارة لحفظ تعصيبه.', 'تذكّر الفتحات: I 8 10 Eggs At 12.'], en: ['"C3, 4, 5 keeps the diaphragm alive."', 'Openings mnemonic: "I 8 10 Eggs At 12" (IVC T8, Oesophagus T10, Aorta T12).'] },
  },

  // ------------------------------------------------------------------ CIRCULATORY
  heart: {
    sys: 'circulatory', latin: 'Cor',
    name: { ar: 'القلب', en: 'Heart' },
    desc: { ar: `عضلة مجوّفة بحجم قبضة اليد (250–350 غ) في المنصف الأوسط، قمّته عند المسافة الوربية الخامسة اليسرى على خط منتصف الترقوة. فيه أربع حجرات (أذينان وبطينان) وأربعة صمامات: ثلاثي الشرف، الرئوي، التاجي (المترالي)، الأبهري. يغذّيه الشريانان التاجيان.`, en: `A fist-sized muscular organ (250–350 g) in the middle mediastinum; its apex lies in the left 5th intercostal space, mid-clavicular line. Four chambers (two atria, two ventricles) and four valves: tricuspid, pulmonary, mitral and aortic. Supplied by the coronary arteries.` },
    func: { ar: `ضخ الدم في دورتين: صغرى (رئوية) من البطين الأيمن إلى الرئتين، وكبرى (جهازية) من البطين الأيسر إلى الجسم. العقدة الجيبية الأذينية هي الناظم الطبيعي.`, en: `Pumps blood through two circuits: pulmonary (right ventricle → lungs) and systemic (left ventricle → body). The sino-atrial node is the natural pacemaker.` },
    clin: { ar: `احتشاء العضلة القلبية؛ الشريان الأمامي النازل الأيسر (LAD) الأكثر انسداداً. مناطق الاستماع للصمامات. سطام القلب (Tamponade) وثلاثية بيك.`, en: `Myocardial infarction — the left anterior descending artery is most often occluded. Valve auscultation areas. Cardiac tamponade (Beck’s triad).` },
    facts: { ar: ['ينبض نحو 100,000 مرة يومياً ويضخ نحو 5 لترات في الدقيقة أثناء الراحة.'], en: ['It beats ~100,000 times a day, pumping ~5 L per minute at rest.'] },
  },
  aorta: {
    sys: 'circulatory', latin: 'Aorta',
    name: { ar: 'الشريان الأبهر', en: 'Aorta' },
    desc: { ar: `أكبر شريان (قطره نحو 2.5 سم). أقسامه: الصاعد (يعطي الشريانين التاجيين)، القوس (الجذع العضدي الرأسي، السباتي المشترك الأيسر، تحت الترقوة الأيسر)، النازل الصدري، ثم البطني (الجذع البطني T12، المساريقي العلوي L1، الكلويان، المساريقي السفلي L3)، وينقسم عند L4 إلى الشريانين الحرقفيين المشتركين.`, en: `The largest artery (~2.5 cm). Parts: ascending (coronary arteries), arch (brachiocephalic trunk, left common carotid, left subclavian), descending thoracic and abdominal (coeliac T12, SMA L1, renal arteries, IMA L3), bifurcating at L4 into the common iliac arteries.` },
    func: { ar: `توزيع الدم المؤكسج إلى كامل الجسم، ويحافظ ارتداده المرن على ضغط الدم أثناء الانبساط.`, en: `Distributes oxygenated blood to the whole body; its elastic recoil maintains diastolic pressure (Windkessel effect).` },
    clin: { ar: `أم الدم الأبهرية البطنية (كتلة نابضة) وخطر تمزّقها. تسلّخ الأبهر (ألم ممزّق ينتشر للظهر). تضيّق برزخ الأبهر الخلقي.`, en: `Abdominal aortic aneurysm (pulsatile mass) risks rupture. Aortic dissection presents with tearing pain radiating to the back. Coarctation of the aorta is congenital.` },
    facts: { ar: ['يمر عبر الحجاب الحاجز خلف الرباط المقوّس الناصف بمستوى T12.'], en: ['It passes behind the median arcuate ligament of the diaphragm at T12.'] },
  },
  vena_cava: {
    sys: 'circulatory', latin: 'V. cava superior et inferior',
    name: { ar: 'الوريدان الأجوفان والأوردة الكبرى', en: 'Venae cavae & major veins' },
    desc: { ar: `الأجوف العلوي يتكوّن من التقاء الوريدين العضديين الرأسيين ويصرّف النصف العلوي من الجسم. الأجوف السفلي — أكبر وريد — يتكوّن من التقاء الوريدين الحرقفيين المشتركين عند L5، ويعبر الحجاب عند T8. كلاهما يصبّ في الأذين الأيمن.`, en: `The SVC forms from the two brachiocephalic veins and drains the upper body. The IVC — the largest vein — forms from the common iliac veins at L5 and pierces the diaphragm at T8. Both drain into the right atrium.` },
    func: { ar: `إعادة الدم غير المؤكسج من الجسم إلى القلب.`, en: `Return deoxygenated blood from the body to the heart.` },
    clin: { ar: `متلازمة الأجوف العلوي (بسبب سرطان الرئة أو اللمفوما): تورّم الوجه وانتفاخ أوردة العنق. ضغط الرحم على الأجوف السفلي عند استلقاء الحامل يسبّب هبوط الضغط. تُركّب القثاطر المركزية فيهما.`, en: `SVC syndrome (lung cancer, lymphoma): facial swelling and distended neck veins. In late pregnancy the uterus compresses the IVC when supine, causing hypotension. Central venous catheters sit in them.` },
    facts: { ar: ['الأجوف السفلي يقع على يمين الأبهر في البطن.'], en: ['In the abdomen the IVC lies to the right of the aorta.'] },
  },
  carotid: {
    sys: 'circulatory', latin: 'A. carotis communis',
    name: { ar: 'الشريان السباتي', en: 'Carotid artery' },
    desc: { ar: `السباتي المشترك الأيمن من الجذع العضدي الرأسي والأيسر من قوس الأبهر مباشرة. ينقسم عند الحافة العليا للغضروف الدرقي (C4) إلى سباتي داخلي (يغذّي الدماغ والعين ولا يعطي فروعاً في العنق) وخارجي (يغذّي الوجه والعنق). عند التشعّب الجيب السباتي والجسم السباتي.`, en: `The right common carotid arises from the brachiocephalic trunk, the left directly from the arch. At the upper border of the thyroid cartilage (C4) it divides into the internal carotid (brain and eye; no neck branches) and external carotid (face and neck). The carotid sinus and body lie at the bifurcation.` },
    func: { ar: `إمداد الرأس والدماغ بالدم. الجيب السباتي مستقبل للضغط والجسم السباتي مستقبل كيميائي للأكسجين.`, en: `Blood supply to the head and brain. The carotid sinus is a baroreceptor; the carotid body a chemoreceptor.` },
    clin: { ar: `جسّ النبض السباتي في الإنعاش. تضيّقه يسبّب نوبات إقفارية عابرة وسكتات، ويُعالج باستئصال باطنة الشريان. تدليك الجيب السباتي يبطئ القلب.`, en: `The carotid pulse is checked in resuscitation. Stenosis causes TIAs and strokes (treated by endarterectomy). Carotid sinus massage slows the heart.` },
    facts: { ar: ['كلمة "سباتي" مشتقة من السُّبات لأن ضغطه يسبّب الإغماء.'], en: ['"Carotid" comes from Greek karoun, "to stupefy" — compression causes fainting.'] },
  },
  brachial_artery: {
    sys: 'circulatory', latin: 'A. subclavia → axillaris → brachialis',
    name: { ar: 'شرايين الطرف العلوي', en: 'Arteries of the upper limb' },
    desc: { ar: `تسلسل واحد يتغيّر اسمه: تحت الترقوة ← الإبطي (عند الضلع الأول) ← العضدي (عند الحافة السفلية للعضلة المدوّرة الكبرى) ← ينقسم في الحفرة المرفقية إلى الكعبري والزندي ← القوسان الراحيان في اليد.`, en: `A single channel that changes name: subclavian → axillary (at the 1st rib) → brachial (at the lower border of teres major) → divides in the cubital fossa into radial and ulnar arteries → palmar arches in the hand.` },
    func: { ar: `إمداد الكتف والذراع والساعد واليد بالدم المؤكسج.`, en: `Supplies oxygenated blood to the shoulder, arm, forearm and hand.` },
    clin: { ar: `قياس ضغط الدم على الشريان العضدي. جسّ النبض الكعبري. اختبار ألن قبل تركيب قثطار في الشريان الكعبري. قد يُصاب الشريان العضدي في كسر فوق اللقمتين.`, en: `Blood pressure is measured over the brachial artery; the radial pulse is palpated at the wrist; Allen’s test precedes radial arterial lines; the brachial artery may be injured in supracondylar fractures.` },
    facts: { ar: ['الشريان الكعبري يُستخدم اليوم كثيراً لقسطرة القلب.'], en: ['The radial artery is now commonly used for cardiac catheterisation.'] },
  },
  femoral_artery: {
    sys: 'circulatory', latin: 'A. iliaca → femoralis → poplitea',
    name: { ar: 'شرايين الطرف السفلي', en: 'Arteries of the lower limb' },
    desc: { ar: `الحرقفي المشترك ← الحرقفي الظاهر ← الفخذي (تحت الرباط الإربي عند النقطة الإربية الوسطى) ← المأبضي خلف الركبة ← الظنبوبيان الأمامي والخلفي ← الشريان الظهري للقدم.`, en: `Common iliac → external iliac → femoral (under the inguinal ligament at the mid-inguinal point) → popliteal behind the knee → anterior and posterior tibial → dorsalis pedis.` },
    func: { ar: `إمداد الحوض والفخذ والساق والقدم بالدم.`, en: `Supplies blood to the pelvis, thigh, leg and foot.` },
    clin: { ar: `جسّ النبض الفخذي. مدخل شائع للقسطرة والتصوير الوعائي. ترتيب المحتويات من الوحشي للإنسي NAVEL: عصب، شريان، وريد، فراغ، لمف. مرض الشرايين المحيطية يسبّب العرج المتقطّع.`, en: `Femoral pulse; common access for catheterisation and angiography. Lateral to medial: NAVEL (Nerve, Artery, Vein, Empty space, Lymphatics). Peripheral arterial disease causes intermittent claudication.` },
    facts: { ar: ['نبض الشريان الظهري للقدم يُجسّ على ظهر القدم وحشي وتر الإبهام الطويل.'], en: ['The dorsalis pedis pulse is felt lateral to the extensor hallucis longus tendon.'] },
  },
  spleen: {
    sys: 'circulatory', latin: 'Lien / Splen',
    name: { ar: 'الطحال', en: 'Spleen' },
    desc: { ar: `أكبر عضو لمفاوي، يقع في المراق الأيسر تحت الأضلاع 9–11، وزنه نحو 150 غ. يتكوّن من اللب الأحمر (لتصفية الدم) واللب الأبيض (نسيج لمفاوي). يُدرج هنا مع الجهاز الدوري لارتباطه الوثيق بالدم.`, en: `The largest lymphoid organ, in the left hypochondrium beneath ribs 9–11, ~150 g. Made of red pulp (blood filtering) and white pulp (lymphoid tissue). Included here with the circulatory system because of its close relation to blood.` },
    func: { ar: `إزالة كريات الدم الحمراء الهرمة، الاستجابة المناعية ضد الجراثيم في الدم، خزن الصفائح، وتكوين الدم في الجنين.`, en: `Removes old red cells, mounts immune responses to blood-borne pathogens, stores platelets and forms blood in the fetus.` },
    clin: { ar: `أكثر عضو يتمزّق في رضوض البطن الكليلة. تضخّم الطحال (الملاريا، اللوكيميا، فرط ضغط الوريد البابي). بعد استئصاله يزداد خطر العدوى بالبكتيريا المحفّظة فتُعطى اللقاحات.`, en: `The organ most often injured in blunt abdominal trauma. Splenomegaly (malaria, leukaemia, portal hypertension). After splenectomy, risk of infection by encapsulated bacteria requires vaccination.` },
    facts: { ar: ['قاعدة الأرقام الفردية: 1×3×5 إنش، 7 أونصات، بين الضلعين 9 و11.'], en: ['Odd-numbers rule: 1×3×5 inches, ~7 oz, lies between ribs 9 and 11.'] },
  },

  // ------------------------------------------------------------------ DIGESTIVE
  esophagus: {
    sys: 'digestive', latin: 'Oesophagus',
    name: { ar: 'المريء', en: 'Oesophagus' },
    desc: { ar: `أنبوب عضلي طوله نحو 25 سم من البلعوم (C6) حتى المعدة (T11)، يمر خلف الرغامى ويعبر الحجاب عند T10. ثلثه العلوي عضلات هيكلية والسفلي ملساء. فيه تضيّقات طبيعية: عند بدايته، وعند قوس الأبهر، والقصبة اليسرى، والحجاب.`, en: `A ~25 cm muscular tube from the pharynx (C6) to the stomach (T11), behind the trachea, passing through the diaphragm at T10. Upper third skeletal, lower third smooth muscle. Natural constrictions: at its origin, aortic arch, left main bronchus and diaphragm.` },
    func: { ar: `نقل الطعام إلى المعدة بالحركة الدودية، والمصرّة السفلية تمنع ارتجاع الحمض.`, en: `Moves food to the stomach by peristalsis; the lower oesophageal sphincter prevents acid reflux.` },
    clin: { ar: `الارتجاع المعدي المريئي ومريء باريت (حالة سابقة للسرطان). دوالي المريء في فرط ضغط الوريد البابي (تليّف الكبد). تعلق الأجسام الغريبة عند التضيّقات.`, en: `GORD and Barrett’s oesophagus (pre-malignant); oesophageal varices in portal hypertension (cirrhosis); swallowed foreign bodies lodge at constrictions.` },
    facts: { ar: ['تستغرق اللقمة نحو 5–8 ثوانٍ لتصل إلى المعدة.'], en: ['A swallowed bolus takes about 5–8 seconds to reach the stomach.'] },
  },
  stomach: {
    sys: 'digestive', latin: 'Gaster / Ventriculus', layer: 4,
    name: { ar: 'المعدة', en: 'Stomach' },
    desc: { ar: `كيس عضلي على شكل حرف J في الربع العلوي الأيسر من البطن. أجزاؤه: الفؤاد، القاع، الجسم، الغار، والبوّاب. له انحناءان صغير وكبير، وجداره الداخلي ذو ثنيات (Rugae). سعته نحو 1–1.5 لتر.`, en: `A J-shaped muscular sac in the left upper quadrant: cardia, fundus, body, antrum and pylorus, with lesser and greater curvatures and internal folds (rugae). Capacity ~1–1.5 L.` },
    func: { ar: `خزن الطعام وخلطه، إفراز حمض الهيدروكلوريك (الخلايا الجدارية) والببسين (الخلايا الرئيسية) والعامل الداخلي اللازم لامتصاص فيتامين B12، وتحويل الطعام إلى كيموس.`, en: `Stores and mixes food; secretes HCl (parietal cells), pepsin (chief cells) and intrinsic factor (needed for vitamin B12 absorption), producing chyme.` },
    clin: { ar: `القرحة الهضمية (جرثومة المعدة H. pylori ومضادات الالتهاب). سرطان المعدة. تضيّق البوّاب الضخامي عند الرضّع (قيء مقذوف).`, en: `Peptic ulcer (H. pylori, NSAIDs); gastric cancer; infantile hypertrophic pyloric stenosis (projectile vomiting).` },
    facts: { ar: ['تتجدد بطانة المعدة كل بضعة أيام لحمايتها من الحمض.'], en: ['The stomach lining renews every few days to resist its own acid.'] },
  },
  liver: {
    sys: 'digestive', latin: 'Hepar', layer: 4,
    name: { ar: 'الكبد', en: 'Liver' },
    desc: { ar: `أكبر عضو داخلي وأكبر غدة (نحو 1.5 كغ) في الربع العلوي الأيمن تحت الحجاب. له فصّان أيمن وأيسر يفصلهما الرباط المنجلي، إضافة إلى الفصين المذنّب والمربّع، و8 قطع (تصنيف كوينو). تروية مزدوجة: الوريد البابي (75%) والشريان الكبدي (25%).`, en: `The largest internal organ and gland (~1.5 kg), in the right upper quadrant under the diaphragm. Right and left lobes (separated by the falciform ligament) plus caudate and quadrate lobes; 8 Couinaud segments. Dual blood supply: portal vein (75%) and hepatic artery (25%).` },
    func: { ar: `أكثر من 500 وظيفة: إنتاج الصفراء، استقلاب السكريات والدهون والبروتينات، إزالة السموم والأدوية، تصنيع الألبومين وعوامل التخثّر، وخزن الغليكوجين والفيتامينات والحديد.`, en: `Over 500 functions: bile production; carbohydrate, fat and protein metabolism; detoxification of drugs and toxins; synthesis of albumin and clotting factors; storage of glycogen, vitamins and iron.` },
    clin: { ar: `التهاب الكبد الفيروسي، التليّف، اليرقان. قدرته على التجدّد تسمح بزرع جزء منه من متبرّع حي. الخزعة الكبدية في المسافة الوربية 8–9 على الخط الإبطي المتوسط.`, en: `Viral hepatitis, cirrhosis and jaundice. Its regenerative capacity allows living-donor partial transplants. Liver biopsy is taken in the 8th–9th intercostal space, mid-axillary line.` },
    facts: { ar: ['يستطيع الكبد أن يتجدّد حتى بعد استئصال 70% منه.'], en: ['The liver can regrow even after ~70% of it is removed.'] },
  },
  gallbladder: {
    sys: 'digestive', latin: 'Vesica biliaris', layer: 4,
    name: { ar: 'المرارة', en: 'Gallbladder' },
    desc: { ar: `كيس كمثري الشكل تحت الكبد، يُسقط قاعه عند طرف الغضروف الضلعي التاسع الأيمن. أجزاؤه: القاع والجسم والعنق، وتتصل بالقناة المرارية التي تتحد مع القناة الكبدية المشتركة لتكوين القناة الصفراوية المشتركة.`, en: `A pear-shaped sac under the liver; its fundus projects at the tip of the right 9th costal cartilage. It has fundus, body and neck, and drains via the cystic duct, which joins the common hepatic duct to form the common bile duct.` },
    func: { ar: `خزن الصفراء وتركيزها، وتنقبض بتأثير هرمون الكوليسيستوكينين بعد الوجبات الدسمة لإفراز الصفراء لهضم الدهون.`, en: `Stores and concentrates bile; contracts in response to cholecystokinin after fatty meals, releasing bile to emulsify fats.` },
    clin: { ar: `حصى المرارة والتهابها (علامة ميرفي). ألم منتقل إلى الكتف الأيمن. مثلث كالو مهم في استئصال المرارة بالمنظار.`, en: `Gallstones and cholecystitis (Murphy’s sign); pain referred to the right shoulder; Calot’s triangle is key in laparoscopic cholecystectomy.` },
    facts: { ar: ['عوامل الخطر التقليدية للحصى: أنثى، بدينة، في الأربعين، ولود.'], en: ['Classic risk factors: female, fat, forty, fertile ("4 Fs").'] },
  },
  pancreas: {
    sys: 'digestive', latin: 'Pancreas',
    name: { ar: 'البنكرياس', en: 'Pancreas' },
    desc: { ar: `غدة خلف الصفاق بمستوى L1–L2، رأسه داخل انحناء الاثني عشر، ثم العنق والجسم والذيل الذي يصل إلى الطحال. يتكوّن من جزء خارجي الإفراز (العنبات ~98%) وجزء صمّي (جزر لانغرهانس).`, en: `A retroperitoneal gland at L1–L2: the head lies in the C-loop of the duodenum, followed by neck, body and tail reaching the spleen. Exocrine acini (~98%) and endocrine islets of Langerhans.` },
    func: { ar: `إفراز الإنزيمات الهاضمة (الأميلاز، الليباز، التربسينوجين) والبيكربونات إلى الاثني عشر، وإفراز الإنسولين (خلايا بيتا) والغلوكاغون (ألفا) والسوماتوستاتين (دلتا) إلى الدم.`, en: `Secretes digestive enzymes (amylase, lipase, trypsinogen) and bicarbonate into the duodenum, and insulin (β cells), glucagon (α cells) and somatostatin (δ cells) into the blood.` },
    clin: { ar: `التهاب البنكرياس الحاد (الحصى والكحول) بألم شرسوفي ينتشر للظهر. سرطان رأس البنكرياس يسبّب يرقاناً غير مؤلم (علامة كورفوازييه). داء السكري.`, en: `Acute pancreatitis (gallstones, alcohol) causes epigastric pain radiating to the back. Cancer of the head causes painless jaundice (Courvoisier’s sign). Diabetes mellitus.` },
    facts: { ar: ['يفرز نحو 1.5 لتر من العصارة يومياً.'], en: ['It secretes about 1.5 L of pancreatic juice per day.'] },
  },
  small_intestine: {
    sys: 'digestive', latin: 'Intestinum tenue', layer: 4,
    name: { ar: 'الأمعاء الدقيقة', en: 'Small intestine' },
    desc: { ar: `أنبوب طوله 6–7 أمتار: الاثنا عشر (نحو 25 سم على شكل C)، ثم الصائم (خُمسان)، ثم اللفائفي (ثلاثة أخماس). سطحها الداخلي مغطى بالزغابات والزغيبات التي ترفع مساحة الامتصاص إلى نحو 30 م².`, en: `A 6–7 m tube: duodenum (~25 cm, C-shaped), jejunum (2/5) and ileum (3/5). Villi and microvilli raise its absorptive surface to ~30 m².` },
    func: { ar: `الموقع الرئيسي لهضم وامتصاص المغذيات. اللفائفي الطرفي يمتص فيتامين B12 وأملاح الصفراء.`, en: `The main site of digestion and nutrient absorption; the terminal ileum absorbs vitamin B12 and bile salts.` },
    clin: { ar: `انسداد الأمعاء. داء كرون يصيب غالباً اللفائفي الطرفي. الداء البطني (حساسية الغلوتين). رتج ميكل ("قاعدة الاثنين").`, en: `Bowel obstruction; Crohn’s disease (often terminal ileum); coeliac disease; Meckel’s diverticulum ("rule of 2s").` },
    facts: { ar: ['رتج ميكل: 2% من الناس، على بُعد قدمين (60 سم) من الصمام اللفائفي الأعوري، بطول 2 إنش.'], en: ['Meckel’s: 2% of people, 2 feet from the ileocaecal valve, 2 inches long.'] },
  },
  large_intestine: {
    sys: 'digestive', latin: 'Intestinum crassum', layer: 4,
    name: { ar: 'الأمعاء الغليظة (القولون)', en: 'Large intestine (Colon)' },
    desc: { ar: `طولها نحو 1.5 م وتؤطّر الأمعاء الدقيقة: الأعور، القولون الصاعد، المستعرض، النازل، السيني، ثم المستقيم والقناة الشرجية. تتميّز بالشُّرط القولونية والتغضّنات (Haustra) والزوائد الشحمية.`, en: `About 1.5 m long, framing the small intestine: caecum, ascending, transverse, descending and sigmoid colon, rectum and anal canal. Features: taeniae coli, haustra and epiploic appendages.` },
    func: { ar: `امتصاص الماء والأملاح، تكوين البراز وتخزينه، واحتضان البكتيريا النافعة التي تنتج فيتامين K.`, en: `Absorbs water and electrolytes, forms and stores faeces, and hosts gut microbiota that produce vitamin K.` },
    clin: { ar: `سرطان القولون والمستقيم — يُكشف مبكراً بتنظير القولون. التهاب الرتوج (غالباً القولون السيني). التهاب القولون التقرّحي.`, en: `Colorectal cancer — screened by colonoscopy; diverticulitis (usually sigmoid); ulcerative colitis.` },
    facts: { ar: ['يعيش في الأمعاء الغليظة تريليونات من البكتيريا تزن نحو 200 غرام.'], en: ['Trillions of bacteria (~200 g) live in the colon.'] },
  },
  appendix: {
    sys: 'digestive', latin: 'Appendix vermiformis', layer: 4,
    name: { ar: 'الزائدة الدودية', en: 'Appendix' },
    desc: { ar: `أنبوب مسدود الطرف طوله 6–9 سم يتصل بالأعور. يُسقط أصلها على سطح البطن عند نقطة ماكبرني (ثلث المسافة من الشوكة الحرقفية الأمامية العلوية إلى السرّة).`, en: `A blind-ended tube 6–9 cm long arising from the caecum. Its base projects to McBurney’s point (one-third of the way from the ASIS to the umbilicus).` },
    func: { ar: `غنية بالنسيج اللمفاوي، ويُعتقد أنها مخزن للبكتيريا النافعة لإعادة استيطان الأمعاء.`, en: `Rich in lymphoid tissue; thought to act as a reservoir of beneficial gut bacteria.` },
    clin: { ar: `التهاب الزائدة: ألم حول السرّة ينتقل إلى الحفرة الحرقفية اليمنى، علامة روفسينغ. أكثر العمليات الجراحية الطارئة شيوعاً في البطن.`, en: `Appendicitis: periumbilical pain migrating to the right iliac fossa, Rovsing’s sign. The most common emergency abdominal operation.` },
    facts: { ar: ['موضعها متغيّر؛ الأشيع خلف الأعور.'], en: ['Its position varies; retrocaecal is the most common.'] },
  },

  // ------------------------------------------------------------------ URINARY
  kidney: {
    sys: 'urinary', latin: 'Ren / Nephros',
    name: { ar: 'الكلية', en: 'Kidney' },
    desc: { ar: `عضو على شكل حبة الفاصوليا خلف الصفاق بين T12 و L3، الكلية اليمنى أخفض قليلاً بسبب الكبد. وزنها نحو 150 غ وطولها 11 سم. تتكوّن من القشرة واللب (الأهرامات) والحويضة، وفي كل كلية نحو مليون نفرون.`, en: `Bean-shaped retroperitoneal organs between T12 and L3; the right is slightly lower because of the liver. Each ~150 g and 11 cm long, with cortex, medulla (pyramids) and pelvis, and about one million nephrons.` },
    func: { ar: `ترشيح الدم (نحو 180 لتراً من الرشاحة يومياً تُنتج 1.5 لتر بول)، تنظيم الماء والأملاح والتوازن الحمضي القاعدي، تنظيم ضغط الدم (الرينين)، إفراز الإريثروبويتين، وتفعيل فيتامين D.`, en: `Filters blood (~180 L of filtrate/day → ~1.5 L urine); regulates water, electrolytes and acid–base balance; controls blood pressure (renin); secretes erythropoietin; activates vitamin D.` },
    clin: { ar: `حصى الكلى، القصور الكلوي المزمن (الغسيل والزراعة)، التهاب الحويضة والكلية (إيلام الزاوية الضلعية الفقرية). الكلية المزروعة توضع في الحفرة الحرقفية.`, en: `Kidney stones; chronic kidney disease (dialysis, transplant); pyelonephritis (costovertebral-angle tenderness). Transplanted kidneys are placed in the iliac fossa.` },
    facts: { ar: ['تمر كل كمية الدم في الجسم عبر الكليتين نحو 40 مرة يومياً.'], en: ['The entire blood volume passes through the kidneys about 40 times a day.'] },
  },
  ureter: {
    sys: 'urinary', latin: 'Ureter',
    name: { ar: 'الحالب', en: 'Ureter' },
    desc: { ar: `أنبوب عضلي طوله 25–30 سم ينقل البول من حويضة الكلية إلى المثانة. له ثلاثة تضيّقات: الوصل الحويضي الحالبي، وعند عبور الأوعية الحرقفية، والوصل الحالبي المثاني.`, en: `A 25–30 cm muscular tube carrying urine from the renal pelvis to the bladder, with three narrowings: pelvi-ureteric junction, crossing of the iliac vessels, and vesico-ureteric junction.` },
    func: { ar: `دفع البول بالحركة الدودية، ويمنع دخوله المائل في جدار المثانة ارتجاع البول.`, en: `Propels urine by peristalsis; its oblique passage through the bladder wall prevents reflux.` },
    clin: { ar: `المغص الكلوي: ألم شديد من الخاصرة إلى المنطقة الإربية عند انحشار الحصاة في التضيّقات. قد يُربط خطأً أثناء استئصال الرحم لأنه يمر تحت الشريان الرحمي ("الماء تحت الجسر").`, en: `Renal colic — severe loin-to-groin pain when a stone lodges at a narrowing. At risk during hysterectomy as it passes under the uterine artery ("water under the bridge").` },
    facts: { ar: ['تنقل موجات انقباضه البول عدة مرات في الدقيقة.'], en: ['Peristaltic waves deliver urine several times per minute.'] },
  },
  bladder: {
    sys: 'urinary', latin: 'Vesica urinaria',
    name: { ar: 'المثانة', en: 'Urinary bladder' },
    desc: { ar: `عضو عضلي أجوف (العضلة النافصة Detrusor) خلف الارتفاق العاني. في قاعدته المثلث المثاني بين فتحتي الحالبين وفتحة الإحليل. سعتها 400–600 مل ويبدأ الإحساس بالحاجة للتبوّل عند 150–300 مل.`, en: `A hollow muscular organ (detrusor muscle) behind the pubic symphysis. The trigone lies between the two ureteric openings and the urethral orifice. Capacity 400–600 mL; urge begins at 150–300 mL.` },
    func: { ar: `خزن البول وإفراغه؛ التبوّل يتحكّم فيه الجهاز نظير الودّي (S2–S4) والمصرّة الخارجية الإرادية.`, en: `Stores and expels urine; micturition is driven by parasympathetic nerves (S2–S4) with voluntary control of the external sphincter.` },
    clin: { ar: `التهاب المسالك البولية أشيع عند النساء لقصر الإحليل. احتباس البول. عند امتلائها ترتفع فوق العانة فيمكن إدخال قثطار فوق العانة.`, en: `UTIs are commoner in women (short urethra). Urinary retention. A full bladder rises above the pubis, allowing suprapubic catheterisation.` },
    facts: { ar: ['جدارها مبطّن بظهارة انتقالية تتمدد مع امتلائها.'], en: ['It is lined by transitional epithelium that stretches as it fills.'] },
  },

  // ------------------------------------------------------------------ ENDOCRINE
  thyroid: {
    sys: 'endocrine', latin: 'Glandula thyroidea',
    name: { ar: 'الغدة الدرقية', en: 'Thyroid gland' },
    desc: { ar: `غدة على شكل فراشة في مقدّمة العنق من فصّين يصلهما برزخ فوق حلقات الرغامى 2–4. تتحرّك مع البلع لارتباطها باللفافة أمام الرغامى. على سطحها الخلفي الغدد جارات الدرق.`, en: `A butterfly-shaped gland in the front of the neck: two lobes joined by an isthmus over tracheal rings 2–4. It moves with swallowing (attached to the pretracheal fascia). The parathyroid glands lie on its posterior surface.` },
    func: { ar: `إفراز هرموني T3 و T4 اللذين ينظّمان الاستقلاب والنمو وتطوّر الدماغ، والكالسيتونين (خلايا C) لخفض الكالسيوم.`, en: `Secretes T3 and T4 (metabolism, growth, brain development) and calcitonin (C cells) which lowers calcium.` },
    clin: { ar: `تضخّم الدرق، فرط ونقص نشاط الغدة. مخاطر استئصالها: إصابة العصب الحنجري الراجع (بحّة) وإزالة جارات الدرق (نقص الكالسيوم).`, en: `Goitre, hyper- and hypothyroidism. Thyroidectomy risks recurrent laryngeal nerve injury (hoarseness) and parathyroid removal (hypocalcaemia).` },
    facts: { ar: ['نقص اليود من أهم أسباب تضخّم الغدة الدرقية عالمياً.'], en: ['Iodine deficiency is a leading cause of goitre worldwide.'] },
  },
  adrenal: {
    sys: 'endocrine', latin: 'Glandula suprarenalis',
    name: { ar: 'الغدة الكظرية', en: 'Adrenal gland' },
    desc: { ar: `غدة صغيرة فوق القطب العلوي لكل كلية؛ اليمنى هرمية واليسرى هلالية. تتكوّن من القشرة (ثلاث طبقات) واللب.`, en: `A small gland on the upper pole of each kidney — the right pyramidal, the left crescentic — composed of a three-zoned cortex and a medulla.` },
    func: { ar: `القشرة: الطبقة الكبيبية تفرز الألدوستيرون (الملح)، الحزمية تفرز الكورتيزول (السكر)، الشبكية تفرز الأندروجينات (الجنس). اللب يفرز الأدرينالين والنورأدرينالين (الكرّ والفرّ).`, en: `Cortex: zona glomerulosa → aldosterone ("salt"), fasciculata → cortisol ("sugar"), reticularis → androgens ("sex"). Medulla → adrenaline and noradrenaline (fight-or-flight).` },
    clin: { ar: `متلازمة كوشينغ (زيادة الكورتيزول)، داء أديسون (قصور الكظر والأزمة الكظرية)، ورم القواتم (ارتفاع ضغط نوبي)، متلازمة كون (زيادة الألدوستيرون).`, en: `Cushing’s syndrome (excess cortisol), Addison’s disease (adrenal insufficiency, adrenal crisis), phaeochromocytoma (episodic hypertension), Conn’s syndrome (excess aldosterone).` },
    facts: { ar: ['تذكّر الطبقات: GFR — Salt, Sugar, Sex.'], en: ['Zones mnemonic: GFR → Salt, Sugar, Sex.'] },
  },
  pituitary: {
    sys: 'endocrine', latin: 'Hypophysis cerebri',
    name: { ar: 'الغدة النخامية', en: 'Pituitary gland' },
    desc: { ar: `غدة بحجم حبة البازلاء (نحو 0.5 غ) تستقر في السرج التركي للعظم الوتدي، وتتصل بالوطاء (Hypothalamus) بواسطة السويقة النخامية. لها فص أمامي (غدّي) وفص خلفي (عصبي).`, en: `A pea-sized gland (~0.5 g) sitting in the sella turcica of the sphenoid bone, connected to the hypothalamus by the pituitary stalk. It has an anterior (glandular) and a posterior (neural) lobe.` },
    func: { ar: `"سيدة الغدد": الفص الأمامي يفرز هرمون النمو، البرولاكتين، TSH، ACTH، FSH و LH. الفص الخلفي يخزّن ويطلق الهرمون المضاد لإدرار البول (ADH) والأوكسيتوسين المصنَّعين في الوطاء.`, en: `The "master gland": the anterior lobe secretes GH, prolactin, TSH, ACTH, FSH and LH; the posterior lobe stores and releases ADH and oxytocin made in the hypothalamus.` },
    clin: { ar: `ورم الغدة النخامية قد يضغط على التصالب البصري فيسبّب عمى الشقّين الصدغيين (Bitemporal hemianopia). العملقة وضخامة النهايات (زيادة هرمون النمو)، والبوالة التفهة (نقص ADH).`, en: `A pituitary adenoma can compress the optic chiasm, causing bitemporal hemianopia. Gigantism/acromegaly (excess GH) and diabetes insipidus (ADH deficiency).` },
    facts: { ar: ['يُوصل إليها جراحياً عبر الأنف والجيب الوتدي.'], en: ['It is reached surgically through the nose and sphenoid sinus (trans-sphenoidal surgery).'] },
  },
  thymus: {
    sys: 'endocrine', latin: 'Thymus', layer: 4,
    name: { ar: 'الغدة الزعترية (التوتة)', en: 'Thymus' },
    desc: { ar: `عضو لمفاوي ثنائي الفص في المنصف الأمامي العلوي خلف القص. كبير نسبياً عند الأطفال ويبلغ أقصى حجمه عند البلوغ ثم يضمر تدريجياً ويُستبدل بالدهون.`, en: `A bilobed lymphoid organ in the superior/anterior mediastinum behind the sternum. Relatively large in children, it peaks at puberty and then involutes, being replaced by fat.` },
    func: { ar: `نضج الخلايا اللمفاوية التائية (T cells) وتعلّمها التمييز بين "الذات" و"غير الذات"، وإفراز هرمون الثيموسين.`, en: `Maturation of T lymphocytes and their education to distinguish "self" from "non-self"; secretes thymosin.` },
    clin: { ar: `ورم التوتة (Thymoma) يرتبط بالوهن العضلي الوبيل (Myasthenia gravis). متلازمة دي جورج: غياب خلقي للتوتة مع نقص مناعة.`, en: `Thymoma is associated with myasthenia gravis. DiGeorge syndrome: congenital thymic absence with immunodeficiency.` },
    facts: { ar: ['يظهر ظلّها كـ"علامة الشراع" في صور صدر الرضّع.'], en: ['In infants it may appear as the "sail sign" on chest X-ray.'] },
  },
  coronary_arteries: {
    sys: 'circulatory', latin: 'Aa. coronariae et venae cordis',
    name: { ar: 'الأوعية التاجية', en: 'Coronary vessels' },
    desc: { ar: `الشريانان التاجيان الأيمن والأيسر هما أول فرعين للأبهر الصاعد. الأيسر ينقسم إلى الأمامي النازل (LAD) والمنعطف، والأيمن يسير في الميزاب الأذيني البطيني ويعطي غالباً النازل الخلفي. الأوردة القلبية (الكبير والأوسط...) تصب في الجيب التاجي.`, en: `The right and left coronary arteries are the first branches of the ascending aorta. The left divides into the left anterior descending (LAD) and circumflex; the right runs in the atrioventricular groove and usually gives the posterior descending artery. Cardiac veins drain into the coronary sinus.` },
    func: { ar: `تغذية عضلة القلب نفسها بالدم المؤكسج. يجري معظم التدفق التاجي أثناء الانبساط.`, en: `Supply the heart muscle itself with oxygenated blood; most coronary flow occurs during diastole.` },
    clin: { ar: `تصلّب الشرايين التاجية يسبّب الذبحة الصدرية والاحتشاء. انسداد LAD يصيب الجدار الأمامي والحاجز. العلاج: القسطرة والدعامات أو جراحة المجازة (Bypass).`, en: `Coronary atherosclerosis causes angina and infarction. LAD occlusion affects the anterior wall and septum. Treated by PCI/stenting or bypass grafting (CABG).` },
    facts: { ar: ['"السيادة" التاجية تُحدَّد بالشريان الذي يعطي النازل الخلفي (الأيمن في ~70%).'], en: ['Coronary "dominance" is defined by which artery gives the posterior descending artery (right in ~70%).'] },
  },
  pulmonary_vessels: {
    sys: 'circulatory', latin: 'Truncus pulmonalis et vv. pulmonales', layer: 4,
    name: { ar: 'الأوعية الرئوية', en: 'Pulmonary vessels' },
    desc: { ar: `الجذع الرئوي يخرج من البطين الأيمن وينقسم إلى شريانين رئويين أيمن وأيسر. تعود الأوردة الرئوية الأربعة إلى الأذين الأيسر.`, en: `The pulmonary trunk leaves the right ventricle and divides into right and left pulmonary arteries; four pulmonary veins return to the left atrium.` },
    func: { ar: `الدورة الصغرى: الشرايين الرئوية تحمل دماً غير مؤكسج إلى الرئتين، والأوردة الرئوية تعيد دماً مؤكسجاً إلى القلب — عكس بقية الجسم.`, en: `Pulmonary circulation: pulmonary arteries carry deoxygenated blood to the lungs and pulmonary veins bring oxygenated blood back — the reverse of the systemic pattern.` },
    clin: { ar: `الانصمام الرئوي (جلطة من أوردة الساق) حالة طارئة مهددة للحياة. ارتفاع ضغط الدم الرئوي. القناة الشريانية تربط الجذع الرئوي بالأبهر في الجنين.`, en: `Pulmonary embolism (usually from leg DVT) is a life-threatening emergency. Pulmonary hypertension. The fetal ductus arteriosus links the pulmonary trunk to the aorta.` },
    facts: { ar: ['الشرايين الرئوية هي الشرايين الوحيدة بعد الولادة التي تحمل دماً غير مؤكسج.'], en: ['After birth, pulmonary arteries are the only arteries carrying deoxygenated blood.'] },
  },
  frontal_lobe: {
    sys: 'nervous', latin: 'Lobus frontalis', layer: 4,
    name: { ar: 'الفص الجبهي', en: 'Frontal lobe' },
    desc: { ar: `أكبر فصوص المخ، يقع أمام التلم المركزي وفوق التلم الجانبي. يضم التلافيف الجبهية العلوية والوسطى والسفلية والتلفيف أمام المركزي (القشرة الحركية الأولية).`, en: `The largest lobe, in front of the central sulcus and above the lateral sulcus. It includes the superior, middle and inferior frontal gyri and the precentral gyrus (primary motor cortex).` },
    func: { ar: `الحركة الإرادية، التخطيط واتخاذ القرار والانتباه (القشرة أمام الجبهية)، الشخصية والسلوك الاجتماعي، ومنطقة بروكا لإنتاج الكلام (في النصف المسيطر).`, en: `Voluntary movement, planning, decision-making and attention (prefrontal cortex), personality and social behaviour, and Broca’s area for speech production (dominant hemisphere).` },
    clin: { ar: `إصابته تسبّب ضعفاً في الجهة المقابلة، وتغيّراً في الشخصية وفقدان الكوابح (حالة فينياس غيج الشهيرة)، وحبسة بروكا (كلام متقطع مع فهم سليم).`, en: `Lesions cause contralateral weakness, personality change and disinhibition (the famous Phineas Gage case), and Broca’s (expressive) aphasia.` },
    facts: { ar: ['القشرة الحركية مرتّبة كخريطة مقلوبة للجسم — "القزم الحركي" (Homunculus).'], en: ['The motor cortex is mapped as an upside-down body — the motor homunculus.'] },
  },
  parietal_lobe: {
    sys: 'nervous', latin: 'Lobus parietalis', layer: 4,
    name: { ar: 'الفص الجداري', en: 'Parietal lobe' },
    desc: { ar: `يقع خلف التلم المركزي وأمام الفص القذالي. يضم التلفيف خلف المركزي (القشرة الحسية الجسدية الأولية) والتلفيفين فوق الحافي والزاوي.`, en: `Lies behind the central sulcus and in front of the occipital lobe; contains the postcentral gyrus (primary somatosensory cortex) and the supramarginal and angular gyri.` },
    func: { ar: `معالجة اللمس والألم والحرارة وحس الوضع، الإدراك المكاني، والقراءة والكتابة والحساب (التلفيف الزاوي).`, en: `Processes touch, pain, temperature and proprioception; spatial awareness; reading, writing and calculation (angular gyrus).` },
    clin: { ar: `إصابة الفص الجداري غير المسيطر تسبّب إهمال نصف الحيّز المقابل. متلازمة غيرستمان (عسر الحساب والكتابة وعمه الأصابع) في المسيطر.`, en: `Non-dominant lesions cause contralateral hemineglect; dominant lesions can cause Gerstmann syndrome (acalculia, agraphia, finger agnosia).` },
    facts: { ar: ['اليدان والشفتان تشغلان مساحة كبيرة جداً من القشرة الحسية.'], en: ['Hands and lips occupy a disproportionately large area of the sensory cortex.'] },
  },
  temporal_lobe: {
    sys: 'nervous', latin: 'Lobus temporalis', layer: 4,
    name: { ar: 'الفص الصدغي', en: 'Temporal lobe' },
    desc: { ar: `يقع أسفل التلم الجانبي (شق سيلفيوس)، ويضم التلافيف الصدغية العلوية والوسطى والسفلية والمغزلي. على سطحه العلوي القشرة السمعية الأولية (تلافيف هيشل).`, en: `Lies below the lateral (Sylvian) fissure, comprising the superior, middle and inferior temporal and fusiform gyri; the primary auditory cortex (Heschl’s gyri) lies on its upper surface.` },
    func: { ar: `السمع، فهم اللغة (منطقة فيرنيكه في النصف المسيطر)، التعرّف على الوجوه والأشياء (التلفيف المغزلي)، والذاكرة بالتعاون مع الحُصين.`, en: `Hearing, language comprehension (Wernicke’s area, dominant side), recognition of faces and objects (fusiform gyrus) and memory together with the hippocampus.` },
    clin: { ar: `صرع الفص الصدغي أشيع أنواع الصرع البؤري عند البالغين. حبسة فيرنيكه: كلام طليق بلا معنى مع ضعف الفهم.`, en: `Temporal lobe epilepsy is the commonest focal epilepsy in adults. Wernicke’s aphasia: fluent but meaningless speech with poor comprehension.` },
    facts: { ar: ['عمه الوجوه (Prosopagnosia) ينتج عن إصابة التلفيف المغزلي.'], en: ['Face blindness (prosopagnosia) results from fusiform gyrus damage.'] },
  },
  occipital_lobe: {
    sys: 'nervous', latin: 'Lobus occipitalis', layer: 4,
    name: { ar: 'الفص القذالي', en: 'Occipital lobe' },
    desc: { ar: `أصغر الفصوص، في مؤخرة المخ فوق خيمة المخيخ. على سطحه الإنسي التلم المهمازي الذي تحيط به القشرة البصرية الأولية (V1).`, en: `The smallest lobe at the back of the cerebrum, above the tentorium. The calcarine sulcus on its medial surface is flanked by the primary visual cortex (V1).` },
    func: { ar: `استقبال الرؤية ومعالجتها: الشكل واللون والحركة، وتفسير ما تراه العين.`, en: `Receives and processes vision — form, colour and motion — and interprets what the eyes see.` },
    clin: { ar: `انسداد الشريان المخي الخلفي يسبّب عمى نصفي متجانس في الجهة المقابلة مع حفظ البقعة. الإصابة الثنائية تسبّب العمى القشري.`, en: `Posterior cerebral artery occlusion causes contralateral homonymous hemianopia with macular sparing; bilateral damage causes cortical blindness.` },
    facts: { ar: ['النصف الأيسر من المجال البصري يُعالَج في الفص القذالي الأيمن.'], en: ['The left visual field is processed by the right occipital lobe.'] },
  },
  insula: {
    sys: 'nervous', latin: 'Insula (Lobus insularis)', layer: 4,
    name: { ar: 'الجزيرة (الفص الجزيري)', en: 'Insula' },
    desc: { ar: `فص مخفي في عمق التلم الجانبي، تغطيه "أغطية" (Opercula) من الفصوص الجبهي والجداري والصدغي.`, en: `A lobe hidden deep within the lateral sulcus, covered by the frontal, parietal and temporal opercula.` },
    func: { ar: `التذوّق، الإحساس بحالة الجسم الداخلية (الجوع، نبض القلب)، المشاعر والوعي الذاتي، والتحكّم الذاتي (اللاإرادي).`, en: `Taste, interoception (hunger, heartbeat), emotion and self-awareness, and autonomic control.` },
    clin: { ar: `يغذّيها الشريان المخي الأوسط فتتأثر مبكراً في سكتاته (علامة فقدان شريط الجزيرة في الأشعة المقطعية).`, en: `Supplied by the middle cerebral artery, it is affected early in MCA strokes (the "insular ribbon sign" on CT).` },
    facts: { ar: ['تنشط الجزيرة عند الشعور بالاشمئزاز.'], en: ['The insula activates strongly with feelings of disgust.'] },
  },
  limbic_system: {
    sys: 'nervous', latin: 'Systema limbicum',
    name: { ar: 'الجهاز الحوفي', en: 'Limbic system' },
    desc: { ar: `مجموعة بنى على الوجه الإنسي للمخ حول جذع الدماغ: التلفيف الحزامي، التلفيف المجاور للحُصين، الحُصين، اللوزة، والقبو (Fornix).`, en: `Structures on the medial surface of the hemisphere encircling the brainstem: cingulate gyrus, parahippocampal gyrus, hippocampus, amygdala and fornix.` },
    func: { ar: `العواطف والسلوك والتحفيز، تكوين الذاكرة الجديدة (الحُصين)، والخوف والاستجابة للتهديد (اللوزة).`, en: `Emotion, behaviour and motivation; forming new memories (hippocampus); fear and threat responses (amygdala).` },
    clin: { ar: `ضمور الحُصين مبكر في مرض ألزهايمر. متلازمة كورساكوف (نقص الثيامين) تصيب دارة بابيز. إصابة اللوزتين تسبّب متلازمة كلوفر-بوسي.`, en: `Hippocampal atrophy is early in Alzheimer’s disease. Korsakoff syndrome (thiamine deficiency) affects the Papez circuit. Bilateral amygdala lesions cause Klüver–Bucy syndrome.` },
    facts: { ar: ['سُمّي الحُصين بهذا الاسم لشبهه بفرس البحر.'], en: ['"Hippocampus" means seahorse — named for its shape.'] },
  },
  corpus_callosum: {
    sys: 'nervous', latin: 'Corpus callosum',
    name: { ar: 'الجسم الثفني', en: 'Corpus callosum' },
    desc: { ar: `أكبر صوار (حزمة ألياف بيضاء) في الدماغ، يحوي نحو 200 مليون محور عصبي ويربط نصفي الكرة المخية. أجزاؤه: المنقار، الركبة، الجسم، والطحال (Splenium).`, en: `The largest commissure of the brain, with ~200 million axons connecting the two hemispheres. Parts: rostrum, genu, body and splenium.` },
    func: { ar: `نقل المعلومات وتنسيق العمل بين نصفي المخ.`, en: `Transfers information and coordinates activity between the hemispheres.` },
    clin: { ar: `قطعه جراحياً قديماً لعلاج الصرع المستعصي أظهر ظاهرة "الدماغ المنقسم". تصاب في التصلب المتعدد (آفات داوسون).`, en: `Surgical section (callosotomy) for refractory epilepsy revealed "split-brain" phenomena. Often involved in multiple sclerosis (Dawson’s fingers).` },
    facts: { ar: ['قد يغيب خلقياً (عدم تكوّن الجسم الثفني) مع أعراض بسيطة أحياناً.'], en: ['It can be congenitally absent (agenesis), sometimes with few symptoms.'] },
  },
  thalamus: {
    sys: 'nervous', latin: 'Thalamus',
    name: { ar: 'المهاد', en: 'Thalamus' },
    desc: { ar: `كتلتان بيضيتان من المادة الرمادية على جانبي البطين الثالث في الدماغ البيني، تتكوّن كل منهما من عدة أنوية.`, en: `Paired egg-shaped masses of grey matter on either side of the third ventricle in the diencephalon, each made of many nuclei.` },
    func: { ar: `"محطة الترحيل": تمر عبره كل الإحساسات (عدا الشم) إلى القشرة، ويشارك في الحركة والوعي والنوم واليقظة.`, en: `The "relay station": all sensations except smell pass through it to the cortex; also involved in motor control, consciousness, sleep and arousal.` },
    clin: { ar: `متلازمة ديجيرين-روسي: ألم مزعج في الجهة المقابلة بعد سكتة مهادية.`, en: `Dejerine–Roussy (thalamic pain) syndrome: severe contralateral pain after a thalamic stroke.` },
    facts: { ar: ['الوطاء (Hypothalamus) يقع أسفل المهاد ويتحكم بالغدة النخامية.'], en: ['The hypothalamus lies just below the thalamus and controls the pituitary.'] },
  },
  ventricles: {
    sys: 'nervous', latin: 'Ventriculi encephali',
    name: { ar: 'بطينات الدماغ', en: 'Ventricles of the brain' },
    desc: { ar: `تجاويف داخل الدماغ مملوءة بالسائل الدماغي الشوكي: البطينان الجانبيان، والبطين الثالث، والمسال المخي (قناة سيلفيوس)، والبطين الرابع الذي يتصل بالحيز تحت العنكبوتية.`, en: `Cavities inside the brain filled with cerebrospinal fluid: two lateral ventricles, the third ventricle, the cerebral aqueduct and the fourth ventricle, which opens into the subarachnoid space.` },
    func: { ar: `تفرز الضفائر المشيمية نحو 500 مل من السائل الدماغي الشوكي يومياً، الذي يحمي الدماغ ويجعله يطفو ويخلّصه من الفضلات.`, en: `Choroid plexuses produce ~500 mL of CSF daily, which cushions and buoys the brain and clears waste.` },
    clin: { ar: `استسقاء الرأس (Hydrocephalus) عند انسداد مجرى السائل، مثل تضيّق المسال المخي، ويُعالج بتحويلة بطينية بريتونية.`, en: `Hydrocephalus results from blocked CSF flow (e.g. aqueductal stenosis) and is treated with a ventriculoperitoneal shunt.` },
    facts: { ar: ['حجم السائل الكلي نحو 150 مل ويتجدد 3–4 مرات يومياً.'], en: ['Total CSF volume is ~150 mL, renewed 3–4 times a day.'] },
  },
  brachialis: {
    sys: 'muscular', latin: 'M. brachialis et M. coracobrachialis',
    name: { ar: 'العضلة العضدية والغرابية العضدية', en: 'Brachialis & Coracobrachialis' },
    desc: { ar: `العضدية تقع تحت ذات الرأسين، من النصف السفلي الأمامي للعضد إلى حدبة الزند. الغرابية العضدية من النتوء الغرابي إلى منتصف العضد. يعصّبهما العصب العضلي الجلدي.`, en: `Brachialis lies deep to biceps, from the lower anterior humerus to the ulnar tuberosity. Coracobrachialis runs from the coracoid to the mid-humerus. Both are supplied by the musculocutaneous nerve.` },
    func: { ar: `العضدية هي "حصان العمل" لثني المرفق في كل أوضاع الساعد. الغرابية العضدية تثني الذراع وتقرّبها.`, en: `Brachialis is the "workhorse" elbow flexor in every forearm position; coracobrachialis flexes and adducts the arm.` },
    clin: { ar: `قد يتكلّس جزء من العضدية بعد كسور المرفق (التعظّم المغاير).`, en: `Brachialis may ossify after elbow fractures (myositis ossificans).` },
    facts: { ar: ['العصب العضلي الجلدي يثقب الغرابية العضدية.'], en: ['The musculocutaneous nerve pierces coracobrachialis.'] },
  },
  rotator_cuff: {
    sys: 'muscular', latin: 'Musculi rotatores humeri',
    name: { ar: 'عضلات الكفة المدوّرة', en: 'Rotator cuff (+ teres major)' },
    desc: { ar: `أربع عضلات تحيط برأس العضد (SITS): فوق الشوكة، تحت الشوكة، المدوّرة الصغرى، وتحت الكتف، إضافة هنا إلى المدوّرة الكبرى المجاورة.`, en: `Four muscles surrounding the humeral head (SITS): supraspinatus, infraspinatus, teres minor and subscapularis, shown here with the neighbouring teres major.` },
    func: { ar: `تثبيت رأس العضد في الجوف العنابي الضحل. فوق الشوكة تبدأ الإبعاد، تحت الشوكة والمدوّرة الصغرى تدوّران للخارج، وتحت الكتف تدوّر للداخل.`, en: `Hold the humeral head in the shallow glenoid. Supraspinatus initiates abduction, infraspinatus and teres minor rotate laterally, subscapularis rotates medially.` },
    clin: { ar: `تمزّق وتر فوق الشوكة شائع مع التقدّم في السن، ومتلازمة الانحشار تحت الأخرم تسبب ألماً في "القوس المؤلم" بين 60° و120°.`, en: `Supraspinatus tears are common with age; subacromial impingement causes a "painful arc" between 60° and 120° of abduction.` },
    facts: { ar: ['تذكّر: SITS — Supraspinatus, Infraspinatus, Teres minor, Subscapularis.'], en: ['Mnemonic: SITS — Supraspinatus, Infraspinatus, Teres minor, Subscapularis.'] },
  },
  serratus_anterior: {
    sys: 'muscular', latin: 'M. serratus anterior',
    name: { ar: 'العضلة المنشارية الأمامية', en: 'Serratus anterior' },
    desc: { ar: `عضلة بأصابع تشبه المنشار على جانب الصدر، من الأضلاع 1–8 إلى الحافة الإنسية للوح الكتف. يعصّبها العصب الصدري الطويل (C5–C7).`, en: `A saw-toothed muscle on the side of the chest, from ribs 1–8 to the medial border of the scapula. Nerve: long thoracic nerve (C5–C7).` },
    func: { ar: `سحب لوح الكتف للأمام (حركة اللكم) وتدويره للأعلى لرفع الذراع فوق الرأس، وتثبيته على جدار الصدر.`, en: `Protracts the scapula (punching) and rotates it upward for overhead elevation, holding it against the chest wall.` },
    clin: { ar: `إصابة العصب الصدري الطويل (مثلاً في استئصال الثدي والعقد الإبطية) تسبب لوح الكتف المجنّح.`, en: `Long thoracic nerve injury (e.g. during axillary surgery) causes a winged scapula.` },
    facts: { ar: ['تُعرف بـ"عضلة الملاكم".'], en: ['Known as the "boxer’s muscle".'] },
  },
  iliopsoas: {
    sys: 'muscular', latin: 'M. iliopsoas',
    name: { ar: 'العضلة الحرقفية القطنية', en: 'Iliopsoas' },
    desc: { ar: `تتكوّن من القطنية الكبرى (من الفقرات T12–L5) والحرقفية (من الحفرة الحرقفية)، وتلتقيان لترتكزا على المدوّر الصغير للفخذ.`, en: `Formed by psoas major (from T12–L5 vertebrae) and iliacus (from the iliac fossa), converging on the lesser trochanter of the femur.` },
    func: { ar: `أقوى ثانٍ لمفصل الورك — رفع الفخذ أثناء المشي وصعود الدرج والجلوس من الاستلقاء.`, en: `The most powerful hip flexor — lifting the thigh when walking, climbing and sitting up.` },
    clin: { ar: `علامة البسوس (ألم عند بسط الورك) في التهاب الزائدة خلف الأعور. خراج البسوس قد ينتج عن السل الفقري.`, en: `Psoas sign (pain on hip extension) in retrocaecal appendicitis. A psoas abscess may complicate spinal tuberculosis.` },
    facts: { ar: ['تمر الكلية والحالب على سطحها الأمامي.'], en: ['The kidney and ureter lie on its anterior surface.'] },
  },
  gluteus_medius: {
    sys: 'muscular', latin: 'Mm. gluteus medius, minimus et tensor fasciae latae',
    name: { ar: 'الألوية الوسطى والصغرى وموتّرة اللفافة', en: 'Gluteus medius, minimus & TFL' },
    desc: { ar: `عضلتان تحت الألوية الكبرى من السطح الخارجي للحرقفة إلى المدوّر الكبير، ومعهما موتّرة اللفافة العريضة. يعصّبها العصب الألوي العلوي (L4–S1).`, en: `Two muscles deep to gluteus maximus, from the outer ilium to the greater trochanter, with tensor fasciae latae. Nerve: superior gluteal nerve (L4–S1).` },
    func: { ar: `إبعاد الورك وتثبيت الحوض أفقياً عند الوقوف على ساق واحدة أثناء المشي.`, en: `Abduct the hip and keep the pelvis level when standing on one leg during walking.` },
    clin: { ar: `ضعفها يعطي علامة ترندلنبرغ الإيجابية ومشية متمايلة؛ ينخفض الحوض في الجهة المقابلة للساق الواقفة.`, en: `Weakness gives a positive Trendelenburg sign and waddling gait — the pelvis drops on the side opposite the stance leg.` },
    facts: { ar: ['الحقن في الأليَة يتم في الألوية الوسطى عبر الربع العلوي الوحشي.'], en: ['Gluteal injections in the upper outer quadrant actually go into gluteus medius.'] },
  },
  sartorius: {
    sys: 'muscular', latin: 'M. sartorius',
    name: { ar: 'العضلة الخيّاطية', en: 'Sartorius' },
    desc: { ar: `أطول عضلة في الجسم، شريطية تعبر الفخذ قطرياً من الشوكة الحرقفية الأمامية العلوية إلى الوجه الإنسي لأعلى الظنبوب (القدم الإوزّي). يعصّبها العصب الفخذي.`, en: `The longest muscle in the body, a strap crossing the thigh diagonally from the ASIS to the medial upper tibia (pes anserinus). Nerve: femoral nerve.` },
    func: { ar: `ثني الورك وإبعاده وتدويره للخارج مع ثني الركبة — وضعية الخيّاط الجالس متربّعاً.`, en: `Flexes, abducts and laterally rotates the hip and flexes the knee — the cross-legged "tailor’s" position.` },
    clin: { ar: `تشكّل الحد الوحشي للمثلث الفخذي الذي يحوي العصب والشريان والوريد الفخذي.`, en: `Forms the lateral border of the femoral triangle containing the femoral nerve, artery and vein.` },
    facts: { ar: ['اسمها من الكلمة اللاتينية Sartor أي الخيّاط.'], en: ['Named from Latin sartor, "tailor".'] },
  },
  adductors: {
    sys: 'muscular', latin: 'Mm. adductores femoris',
    name: { ar: 'العضلات المقرِّبة للفخذ', en: 'Adductor muscles' },
    desc: { ar: `مجموعة الحيز الإنسي للفخذ: المقرّبة الطويلة والقصيرة والكبيرة (والصغرى). تنشأ من العانة والإسك وترتكز على الخط الخشن للفخذ. يعصّبها أساساً العصب السدّادي.`, en: `The medial thigh compartment: adductor longus, brevis and magnus (and minimus), from the pubis and ischium to the linea aspera. Mainly supplied by the obturator nerve.` },
    func: { ar: `تقريب الفخذ نحو الخط الناصف وتثبيت الحوض أثناء المشي.`, en: `Adduct the thigh and stabilise the pelvis during gait.` },
    clin: { ar: `شدّ العضلات المقرِّبة (إصابة الفخذ الداخلي) شائع في كرة القدم. يمر الشريان الفخذي عبر الفتحة الوترية للمقرّبة الكبيرة ليصبح مأبضياً.`, en: `Groin (adductor) strains are common in football. The femoral artery passes through the adductor hiatus to become the popliteal artery.` },
    facts: { ar: ['المقرّبة الكبيرة لها جزء "أوتار مأبضية" يعصّبه العصب الوركي.'], en: ['Adductor magnus has a "hamstring part" supplied by the sciatic nerve.'] },
  },
  soleus: {
    sys: 'muscular', latin: 'M. soleus',
    name: { ar: 'العضلة النعلية', en: 'Soleus' },
    desc: { ar: `عضلة عريضة مسطحة عميقة للتوأمية، من أعلى الظنبوب والشظية، وتشترك معها في وتر أخيل. يعصّبها العصب الظنبوبي.`, en: `A broad flat muscle deep to gastrocnemius, from the upper tibia and fibula, sharing the Achilles tendon. Nerve: tibial nerve.` },
    func: { ar: `ثني القدم الأخمصي، وتمنع السقوط للأمام عند الوقوف، ومضخة وريدية مهمة.`, en: `Plantar flexion; prevents falling forward when standing; an important venous pump.` },
    clin: { ar: `الجيوب الوريدية داخلها مكان شائع لبدء خثار الأوردة العميقة عند الجلوس الطويل.`, en: `Its venous sinuses are a common starting site for DVT during prolonged immobility.` },
    facts: { ar: ['اسمها من سمك موسى (Sole) لشكلها المسطح.'], en: ['Named after the flat sole fish.'] },
  },
};

// --------------------------------------------------------------------- UI strings
export const UI = {
  ar: {
    appTitle: 'التشريح بالواقع المعزز',
    appSubtitle: 'أعضاء وأجهزة جسم تفاعلية ثلاثية الأبعاد لدراسة التشريح طبقة تلو الأخرى',
    layers: 'الطبقات', ar: 'واقع معزز', camera: 'الكاميرا', quiz: 'اختبار', help: 'مساعدة',
    searchPh: '🔍 ابحث عن عضو أو عظمة أو عضلة...',
    peel: 'تقشير الطبقات:', explode: 'تفكيك الأجزاء (Explode)', systems: 'الأجهزة', opacity: 'الشفافية',
    overview: 'نظرة عامة', function: 'الوظيفة', clinical: 'أهمية سريرية', facts: 'حقائق',
    focus: 'تركيز', isolate: 'عزل', unisolate: 'إلغاء العزل', hide: 'إخفاء', ghost: 'شفاف', solid: 'معتم',
    pullOut: 'إخراج', putBack: 'إرجاع', speak: 'استماع', stop: 'إيقاف',
    manipulate: 'تحريك الجزء:', move: 'نقل', rotate: 'تدوير', scale: 'تحجيم', resetPart: 'إعادة',
    resetView: 'العرض', showAll: 'إظهار الكل', resetAll: 'إعادة الكل', autoRotate: 'دوران', labels: 'التسميات',
    selectHint: 'المس أي جزء لعرض شرحه • اسحب للتدوير • قرّب بإصبعين',
    loading: 'جارٍ بناء جسم الإنسان ثلاثي الأبعاد...',
    left: 'يسار', right: 'يمين', layer: 'طبقة', partsCount: 'جزء',
    arUnsupported: 'الواقع المعزز (WebXR) غير مدعوم على هذا الجهاز/المتصفح. جرّب Chrome على أندرويد عبر HTTPS، أو استخدم وضع "الكاميرا".',
    camError: 'تعذّر تشغيل الكاميرا. تأكد من منح الإذن ومن فتح الصفحة عبر HTTPS أو localhost.',
    camOn: 'وضع الكاميرا: النموذج يظهر فوق صورة الكاميرا الحية.',
    arHintScan: 'حرّك الجهاز ببطء لاكتشاف سطح مستوٍ، ثم المس الشاشة لوضع الجسم.',
    arHintPlaced: 'المس جزءاً لعرض شرحه • اسحب بإصبع للتدوير • قرّب/أبعد بإصبعين للتكبير',
    tableSize: 'حجم الطاولة', lifeSize: 'الحجم الطبيعي', reposition: 'إعادة الوضع', exitAR: 'خروج',
    quizName: 'ما اسم هذا الجزء؟', quizFind: 'أين يقع؟', score: 'النتيجة', next: 'التالي',
    quizWhat: 'ما اسم الجزء المضيء؟', quizWhere: 'المس على النموذج: ', correct: '✔ إجابة صحيحة!', wrong: '✘ إجابة خاطئة — الإجابة الصحيحة: ',
    quizNoParts: 'لا توجد أجزاء ظاهرة للاختبار. غيّر الطبقات أولاً.',
    noVoice: 'لا يوجد صوت عربي مثبت على هذا الجهاز للقراءة.',
    isolatedMsg: 'تم عزل الجزء — اضغط "إظهار الكل" للعودة', hiddenMsg: 'تم إخفاء الجزء',
    helpHtml: `
      <h3>طريقة الاستخدام</h3>
      <h4>👆 التفاعل</h4>
      <ul>
        <li>المس/انقر أي جزء لعرض اسمه وشرحه الكامل: نظرة عامة، الوظيفة، الأهمية السريرية، وحقائق.</li>
        <li>اسحب بإصبع واحد للتدوير، بإصبعين للتكبير والتحريك. انقر مرتين على جزء للتركيز عليه.</li>
      </ul>
      <h4>🧅 الطبقات</h4>
      <ul>
        <li>استخدم شريط "تقشير الطبقات" لإزالة الجلد ثم العضلات ثم الهيكل للوصول إلى الأعضاء العميقة.</li>
        <li>شغّل/أطفئ أي جهاز، وغيّر شفافيته، أو افتح قائمته لاختيار جزء محدد.</li>
        <li>"تفكيك الأجزاء" يباعد الأجزاء عن بعضها لرؤية العلاقات التشريحية.</li>
      </ul>
      <h4>✥ تحريك الأجزاء</h4>
      <ul>
        <li>بعد اختيار جزء: نقل / تدوير / تحجيم بالمقابض الملونة، أو "إخراج" لسحبه أمام الجسم وفحصه.</li>
        <li>"عزل" يُظهر الجزء وحده، "شفاف" يجعله شفافاً، "إعادة" ترجعه لمكانه.</li>
      </ul>
      <h4>◎ الواقع المعزز</h4>
      <ul>
        <li><b>أندرويد (Chrome):</b> اضغط "واقع معزز"، حرّك الجهاز لاكتشاف سطح، ثم المس لوضع الجسم على الطاولة أو الأرض.</li>
        <li><b>آيباد / أجهزة أخرى:</b> استخدم وضع "الكاميرا" لعرض النموذج فوق صورة الكاميرا.</li>
        <li>يتطلب الواقع المعزز والكاميرا فتح الصفحة عبر HTTPS.</li>
      </ul>
      <h4>🎯 الاختبار</h4>
      <ul><li>وضعان: تعرّف على اسم الجزء المضيء، أو ابحث عن الجزء المطلوب والمسه.</li></ul>
      <p style="color:#94a3b8;font-size:13px">النماذج مبسّطة لأغراض تعليمية ولا تغني عن الأطالس التشريحية والمختبر.</p>`,
  },
  en: {
    appTitle: 'AR Anatomy',
    appSubtitle: 'Interactive 3D organs and body systems for studying anatomy layer by layer',
    layers: 'Layers', ar: 'AR', camera: 'Camera', quiz: 'Quiz', help: 'Help',
    searchPh: '🔍 Search an organ, bone or muscle...',
    peel: 'Peel layers:', explode: 'Explode parts', systems: 'Body systems', opacity: 'Opacity',
    overview: 'Overview', function: 'Function', clinical: 'Clinical', facts: 'Facts',
    focus: 'Focus', isolate: 'Isolate', unisolate: 'Un-isolate', hide: 'Hide', ghost: 'Ghost', solid: 'Solid',
    pullOut: 'Pull out', putBack: 'Put back', speak: 'Listen', stop: 'Stop',
    manipulate: 'Manipulate:', move: 'Move', rotate: 'Rotate', scale: 'Scale', resetPart: 'Reset',
    resetView: 'View', showAll: 'Show all', resetAll: 'Reset all', autoRotate: 'Spin', labels: 'Labels',
    selectHint: 'Tap any part to learn about it • drag to rotate • pinch to zoom',
    loading: 'Building the 3D human body...',
    left: 'left', right: 'right', layer: 'Layer', partsCount: 'parts',
    arUnsupported: 'WebXR AR is not supported on this device/browser. Try Chrome on Android over HTTPS, or use Camera mode.',
    camError: 'Could not start the camera. Grant permission and open the page via HTTPS or localhost.',
    camOn: 'Camera mode: the model is shown over the live camera feed.',
    arHintScan: 'Move the device slowly to detect a flat surface, then tap to place the body.',
    arHintPlaced: 'Tap a part to learn about it • one-finger drag to rotate • pinch to scale',
    tableSize: 'Table size', lifeSize: 'Life size', reposition: 'Reposition', exitAR: 'Exit',
    quizName: 'Name it', quizFind: 'Find it', score: 'Score', next: 'Next',
    quizWhat: 'What is the highlighted part?', quizWhere: 'Tap on the model: ', correct: '✔ Correct!', wrong: '✘ Wrong — correct answer: ',
    quizNoParts: 'No visible parts to quiz. Change the layers first.',
    noVoice: 'No suitable voice installed for speech on this device.',
    isolatedMsg: 'Part isolated — press "Show all" to return', hiddenMsg: 'Part hidden',
    helpHtml: `
      <h3>How to use</h3>
      <h4>👆 Interaction</h4>
      <ul>
        <li>Tap/click any part to see its name and full explanation: overview, function, clinical relevance and facts.</li>
        <li>Drag with one finger to rotate, two fingers to zoom/pan. Double-tap a part to focus on it.</li>
      </ul>
      <h4>🧅 Layers</h4>
      <ul>
        <li>Use "Peel layers" to remove skin, then muscles, then skeleton to reach the deep organs.</li>
        <li>Toggle each system, change its opacity, or expand it to pick a specific part.</li>
        <li>"Explode parts" spreads structures apart to reveal anatomical relations.</li>
      </ul>
      <h4>✥ Manipulating parts</h4>
      <ul>
        <li>After selecting a part: Move / Rotate / Scale with the coloured handles, or "Pull out" to bring it in front of the body.</li>
        <li>"Isolate" shows it alone, "Ghost" makes it transparent, "Reset" puts it back.</li>
      </ul>
      <h4>◎ Augmented reality</h4>
      <ul>
        <li><b>Android (Chrome):</b> press "AR", move the device to find a surface, then tap to place the body on a table or the floor.</li>
        <li><b>iPad / others:</b> use "Camera" mode to overlay the model on the live camera.</li>
        <li>AR and camera require the page to be served over HTTPS.</li>
      </ul>
      <h4>🎯 Quiz</h4>
      <ul><li>Two modes: name the highlighted part, or find the requested part and tap it.</li></ul>
      <p style="color:#94a3b8;font-size:13px">Models are simplified for teaching and do not replace anatomical atlases or the dissection lab.</p>`,
  },
};
