BUILD_DIR=$(cd "$(dirname "$0")"; pwd)

# The input parameters are $1, $2 and $3
#  $1: old text | $2: new text | s3: file path
stringReplace () {
    echo $(sed "s/$1/$2/g"<<<$3)
}

# The input parameters are $1 and $2
# $1: get the first paragraph | $2: get the line number
updatOrInsertLineNum () {
    onyIT=${1:0:4}
                if [ "$1" == "it('LINE" -o "$1" == 'it("LINE' ]; then
                    numLineDelete=${arrLine[1]}
                    # Replace the number of old lines to the new line number
                    stringReplace $numLineDelete $2 $a
                elif [ "$1" == "//" ]; then
                    echo $a
                elif [ "$1" == "it(" ]; then
                    numLineDelete=${arrLine[2]}
                    stringReplace $numLineDelete $2 $a
                elif [ "$onyIT" == 'it("' ]; then
                    itString1='it("'
                    insertNumber=$(sed "s/$itString1/"$itString1"LINE $2 -/g"<<<"${a}")
                    echo $insertNumber
                # If no line numbers are available, add them
                else 
                    itString="it('"
                    newString="it('LINE $2 - "
                    stringReplace $itString $newString $a
                fi
}

# update and save the lines to file
updateEachLine () {
    numLine=1
    while IFS= read -r a;
        do
            # convert text lines to arrays
            IFS=' ' read -r -a arrLine <<< "$a"
            firstParagraph=${arrLine[0]}
            if [[ $a == *"it("* ]]; then
                updatOrInsertLineNum $firstParagraph $numLine
            # If the command is ignored
            elif [ "$firstParagraph" == "//" ]; then
                echo $a
            else
                echo $a
            fi
        numLine=$((numLine+1))
    done < <(grep "" $1) > $1.t ; mv $1{.t,}
}

# read flow test  for Viet Nam
printf "\n\n\x1b[33m========== Fixing line test case Viet Nam =========== \x1b[0m \n\n" 
cd e2e/vietnam/flow-test
while IFS= read -r f1; do
    path=${f1:2}
    IFS=''
    # Read each line of the file path
    updateEachLine $path
done < <(find . -type f | sort -n)

# read view test
cd ../view-test
while IFS= read -r f1; do
    path=${f1:2}
    IFS=''
    # Read each line of the file path
    updateEachLine $path
done < <(find . -type f | sort -n)

# -----------------------------------------

# read flow test  for ThaiLan
printf "\n\n\x1b[33m========== Fixing line test case ThaiLan =========== \x1b[0m \n\n" 
cd $BUILD_DIR
cd e2e/thailand/flow-test
while IFS= read -r f1; do
    path=${f1:2}
    IFS=''
    # Read each line of the file path
    updateEachLine $path
done < <(find . -type f | sort -n)

# read view test
cd ../view-test
while IFS= read -r f1; do
    path=${f1:2}
    IFS=''
    # Read each line of the file path
    updateEachLine $path
done < <(find . -type f | sort -n)


# -----------------------------------------

# read flow test  for Indonesia
printf "\n\n\x1b[33m========== Fixing line test case Indonesia =========== \x1b[0m \n\n" 
cd $BUILD_DIR
cd e2e/indonesia/flow-test
while IFS= read -r f1; do
    path=${f1:2}
    IFS=''
    # Read each line of the file path
    updateEachLine $path
done < <(find . -type f | sort -n)

# read view test
cd ../view-test
while IFS= read -r f1; do
    path=${f1:2}
    IFS=''
    # Read each line of the file path
    updateEachLine $path
done < <(find . -type f | sort -n)
printf "\n\n\x1b[33m========== Done =========== \x1b[0m \n\n" 