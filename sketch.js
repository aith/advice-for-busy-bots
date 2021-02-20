// https://www.kdnuggets.com/2019/11/markov-chains-train-text-generation.html
let can; let canw = 800; let canh = 800;

function setup() {
    can = createCanvas(canh, canw)
    frameRate(60)

    let prefix_suffix_dict = {}

    let use_australia_attacks = true

    let corpus = ''
    corpus += bartender  // technically not correct- just makes 2 n-grams not align
    corpus += knowledge_box

    let words = corpus
    words = words.split(" ").filter(word => !Number.isInteger(parseInt(word)))

    let dict_len = 0;
    let idx = 0;
    let n = 2;
    for(; idx < words.length - n; idx++) {
        let prefix = ''
        for (let n_idx = 0; n_idx < n; n_idx++) {  // iot get n-gram
            if(n_idx != 0) prefix += " "
             prefix += words[idx + n_idx]
        }
        let suffix = words[idx+n]
        if(!prefix_suffix_dict[prefix]) {prefix_suffix_dict[prefix] = []; dict_len++}
        if( !(prefix_suffix_dict[prefix].includes(suffix)) ) {
            prefix_suffix_dict[prefix].push(suffix)
        }
    }

    if(words.length < 2) { print("Could only parse <2 words. Exiting."); return false; }

    let starting_word_index = random(0, dict_len) | 0;
    let prefix = Object.keys(prefix_suffix_dict)[starting_word_index]
    if(!prefix) { print("Error. Try refreshing"); return;}
    while(prefix == prefix.toLowerCase()) {
        starting_word_index = random(0, dict_len) | 0;
        prefix = Object.keys(prefix_suffix_dict)[starting_word_index]
    }

    let starting_word = "";

    starting_word = prefix.capitalize();

    let count = 100

    let concat_symbol = " " 
    let sentence = starting_word;
    let need_newline = false;
    for (let word_idx = 0; word_idx < count - 1 || need_newline; word_idx++) {
        if(prefix.match(/\n\s*$(?!\n)/)) print("hi")
        if(!prefix) {
            let starting_word_index = random(0, dict_len) | 0;
            prefix = Object.keys(prefix_suffix_dict)[starting_word_index]
        }
        let suffix_index = random(0, prefix_suffix_dict[prefix].length) | 0
        let suffix = prefix_suffix_dict[prefix][suffix_index]
        sentence += " " + suffix
            // .replace(/_/, "")
        prefix = prefix.split(" ")[1] + " "+ suffix;
        if(suffix.charAt(suffix.length - 1) == ".") need_newline = false;
        if(word_idx == count - 2) { need_newline = true;}
    }
    // print(sentence)

    // Make sure it starts with recipe
    let slice_idx = 0;
    while((sentence.charAt(slice_idx) != '\n'
           || sentence.charAt(slice_idx+1) == sentence.charAt(slice_idx+1).toLowerCase())
         && sentence.charAt(slice_idx+1) != ''
         ) {
        slice_idx++;
        // if(sentence.charAt(slice_idx) == '\n')
    }
    if(slice_idx >= sentence.length) slice_idx = 0
    else slice_idx++
    print(slice_idx)
    print(sentence.charAt(slice_idx))
    print(sentence.slice(slice_idx, sentence.length))

}

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1)
}

function draw() {
    noLoop()
}
