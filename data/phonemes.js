const DataPhonemes = {

  list: [
    { id: 'ae',    ipa: '/æ/',   type: 'vowel',     example: 'cat',   hint: 'فتحة واسعة قصيرة' },
    { id: 'e',     ipa: '/e/',   type: 'vowel',     example: 'bed',   hint: 'كسرة خفيفة' },
    { id: 'i',     ipa: '/ɪ/',   type: 'vowel',     example: 'sit',   hint: 'كسرة قصيرة' },
    { id: 'o',     ipa: '/ɒ/',   type: 'vowel',     example: 'dog',   hint: 'فتحة قصيرة مستديرة' },
    { id: 'ah',    ipa: '/ʌ/',   type: 'vowel',     example: 'cup',   hint: 'فتحة وسطية' },
    { id: 'ee',    ipa: '/iː/',  type: 'vowel',     example: 'see',   hint: 'ياء طويلة' },
    { id: 'oo',    ipa: '/uː/',  type: 'vowel',     example: 'moon',  hint: 'واو طويلة' },
    { id: 'k',     ipa: '/k/',   type: 'consonant', example: 'cat',   hint: 'كاف من الحلق' },
    { id: 'g',     ipa: '/g/',   type: 'consonant', example: 'go',    hint: 'جيم مصرية' },
    { id: 't',     ipa: '/t/',   type: 'consonant', example: 'top',   hint: 'تاء' },
    { id: 'd',     ipa: '/d/',   type: 'consonant', example: 'dog',   hint: 'دال' },
    { id: 'p',     ipa: '/p/',   type: 'consonant', example: 'pen',   hint: 'باء بلا صوت' },
    { id: 'b',     ipa: '/b/',   type: 'consonant', example: 'bed',   hint: 'باء' },
    { id: 'm',     ipa: '/m/',   type: 'consonant', example: 'man',   hint: 'ميم' },
    { id: 'n',     ipa: '/n/',   type: 'consonant', example: 'net',   hint: 'نون' },
    { id: 's',     ipa: '/s/',   type: 'consonant', example: 'sun',   hint: 'سين' },
    { id: 'f',     ipa: '/f/',   type: 'consonant', example: 'fish',  hint: 'فاء' },
    { id: 'h',     ipa: '/h/',   type: 'consonant', example: 'hat',   hint: 'هاء' },
    { id: 'l',     ipa: '/l/',   type: 'consonant', example: 'leg',   hint: 'لام' },
    { id: 'r',     ipa: '/r/',   type: 'consonant', example: 'red',   hint: 'راء' },
    { id: 'w',     ipa: '/w/',   type: 'consonant', example: 'wet',   hint: 'واو' },
    { id: 'y',     ipa: '/j/',   type: 'consonant', example: 'yes',   hint: 'ياء' },
    { id: 'v',     ipa: '/v/',   type: 'consonant', example: 'van',   hint: 'فاء مهتزة' },
    { id: 'z',     ipa: '/z/',   type: 'consonant', example: 'zoo',   hint: 'زاي' },
    { id: 'sh',    ipa: '/ʃ/',   type: 'consonant', example: 'ship',  hint: 'شين' },
    { id: 'ch',    ipa: '/tʃ/',  type: 'consonant', example: 'chair', hint: 'تش' },
    { id: 'j',     ipa: '/dʒ/',  type: 'consonant', example: 'jam',   hint: 'جيم' },
    { id: 'th_u',  ipa: '/θ/',   type: 'consonant', example: 'think', hint: 'ثاء' },
    { id: 'th_v',  ipa: '/ð/',   type: 'consonant', example: 'this',  hint: 'ذال' }
  ],

  byId(id) {
    return this.list.find(p => p.id === id);
  },

  byType(type) {
    return this.list.filter(p => p.type === type);
  },

  all() {
    return this.list;
  }
};