// https://www.kdnuggets.com/2019/11/markov-chains-train-text-generation.html
let can; let canw = 800; let canh = 800;

function setup() {
    can = createCanvas(canh, canw)
    frameRate(60)

    let prefix_suffix_dict = {}

    let use_australia_attacks = true

    let corpus = ''
    // corpus += history
    // corpus += genesis
    corpus += frost
    // corpus += whitman
    corpus += north_of_boston

    let words = corpus.replace("\n", " ").replace("_", " ");  // filter out numbers, change from \n to "", then split by ""
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
    print("index is "+starting_word_index)
    print("when len is "+Object.keys(prefix_suffix_dict).length)
    let prefix = Object.keys(prefix_suffix_dict)[starting_word_index]
    let starting_word = "";

    starting_word = prefix.capitalize();

    let count = 300

    let concat_symbol = " " 
    let sentence = starting_word;
    let need_newline = false;
    for (let word_idx = 0; word_idx < count - 1 || need_newline; word_idx++) {
        // print("prefix is "+prefix)
        // Case: the final n-gram in the corpus does not have an entry in the dict
        if(!prefix) {
            let starting_word_index = random(0, dict_len) | 0;
            prefix = Object.keys(prefix_suffix_dict)[starting_word_index]
        }
        let suffix_index = random(0, prefix_suffix_dict[prefix].length) | 0
        let suffix = prefix_suffix_dict[prefix][suffix_index]
        sentence += " " + suffix
        prefix = prefix.split(" ")[1] + " "+ suffix;
        if (prefix == " " && need_newline) { print("prefix is "+prefix); need_newline = false }
        if(word_idx == count - 2) { print("here"); need_newline = true;}
    }
    print(sentence)
}

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1)
}

function draw() {
    noLoop()
}

/*
def review_generator():
    text = ask_user()
    reviews = open(text, 'r').read()
    reviews = ''.join([i for i in reviews if not i.isdigit()]).replace("\n", " ").split(' ')  // join reviews toghether, taking out numb and newlines and then split them into an list
    
    index = 1
    chain = {}
    count = int(input('How many words would you like your review to be?'))
    
    for word in reviews[index:]:
        key = reviews[index-1]
        if key in chain:
            chain[key].append(word)  // chain contains all the suffixes for that kye
        else:
            chain[key] = [word]
        index += 1
    
    word1 = random.choice(list(chain.keys()))  // 
    message = word1.capitalize()

    while len(message.split(' ')) < count:  
        word2 = random.choice(chain[word1])
        word1 = word2
        message += ' ' + word2
    return message
    */
