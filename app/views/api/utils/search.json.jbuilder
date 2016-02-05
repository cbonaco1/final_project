matches = 0

json.results do
  json.array! @search_results do |result|
    result = result.searchable

    if result.author_id == current_user.id
      matches += 1
      if result.class == Note
        json.partial!("api/notes/notes", note: result)
      else
        json.partial!("api/notebooks/notebooks", notebook: result)
      end
      json._type result.class.to_s
    end

  end
end
json.total_count matches
